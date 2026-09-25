import { Listing, MatchmakerCriteria, MatchedListingResult } from '../types';

export const calculatePropertyMatches = (
  listings: Listing[],
  criteria: MatchmakerCriteria
): MatchedListingResult[] => {
  const publishedListings = listings.filter(l => l.status === 'published');

  const results: MatchedListingResult[] = publishedListings.map(listing => {
    let score = 50; // base score
    const matchReasons: string[] = [];

    // 1. Transaction match
    if (listing.transaction === criteria.transaction) {
      score += 15;
      matchReasons.push(criteria.transaction === 'sale' ? 'Për shitje të menjëhershme' : 'Për qira');
    } else {
      score -= 30;
    }

    // 2. City match
    if (criteria.targetCities.length === 0 || criteria.targetCities.includes('all') || criteria.targetCities.includes(listing.location.city)) {
      score += 15;
      matchReasons.push(`Ndodhet në zonën e kërkuar (${listing.location.city}, ${listing.location.neighborhood})`);
    } else {
      score -= 25;
    }

    // 3. Budget match
    if (criteria.maxBudget > 0) {
      if (listing.price <= criteria.maxBudget) {
        score += 15;
        const savings = criteria.maxBudget - listing.price;
        if (savings > 0) {
          matchReasons.push(`Brenda buxhetit tuaj (€${savings.toLocaleString()} nën limitin maksimal)`);
        } else {
          matchReasons.push('Përputhet saktësisht me buxhetin tuaj');
        }
      } else if (listing.price <= criteria.maxBudget * 1.1) {
        score += 5;
        matchReasons.push('Vetëm pak mbi buxhet (mundësi e lartë negociimi)');
      } else {
        score -= 20;
      }
    }

    // 4. Purpose-based scoring
    if (criteria.purpose === 'investment') {
      if (listing.transaction === 'sale' && (listing.location.city === 'Prishtinë' || listing.location.city === 'Tiranë')) {
        score += 10;
        matchReasons.push('Potencial i lartë qiradhënieje dhe kthim kapitali mbi 7% ROI');
      }
    } else if (criteria.purpose === 'diaspora_vacation') {
      if (listing.location.country === 'Albania' || listing.hasVirtualTour || listing.verified) {
        score += 10;
        matchReasons.push('Ideale për pushime bregdetare / menaxhim në distancë nga diaspora');
      }
    } else if (criteria.purpose === 'commercial') {
      if (listing.category === 'commercial') {
        score += 15;
        matchReasons.push('Objekt i përshtatshëm për biznes / zyre me frekuentim të lartë');
      }
    }

    // 5. Must-haves & Amenities
    if (criteria.mustHaves.cleanTitle && listing.cadastralZone) {
      score += 8;
      matchReasons.push('Fletë Poseduese dhe status kadastral i verifikuar');
    }

    if (criteria.mustHaves.parking && (listing.category === 'parking' || listing.amenities?.some(a => a.toLowerCase().includes('parking') || a.toLowerCase().includes('garage')))) {
      score += 8;
      matchReasons.push('Përfshin vend parkimi / garazh të dedikuar');
    }

    if (criteria.mustHaves.elevator && listing.amenities?.some(a => a.toLowerCase().includes('elevator') || a.toLowerCase().includes('ashensor'))) {
      score += 6;
      matchReasons.push('Ndërtesë me ashensor funksional');
    }

    if (criteria.mustHaves.balcony && (listing.amenities?.some(a => a.toLowerCase().includes('balcony') || a.toLowerCase().includes('terrace')))) {
      score += 6;
      matchReasons.push('Ballkon / terasë e bollshme');
    }

    if (criteria.mustHaves.bankMortgageEligible && listing.verified) {
      score += 6;
      matchReasons.push('E përshtatshme për financim me kredi hipotekare bankare');
    }

    if (criteria.mustHaves.newConstruction && (listing.condition === 'new_construction' || (listing.yearBuilt && listing.yearBuilt >= 2020))) {
      score += 6;
      matchReasons.push('Ndërtim i ri me standarde moderne termo-izoluese');
    }

    if (criteria.minBedrooms > 0 && listing.bedrooms && listing.bedrooms >= criteria.minBedrooms) {
      score += 8;
      matchReasons.push(`${listing.bedrooms} dhoma gjumi (plotëson kërkesën minimale)`);
    }

    // Normalize between 35 and 99
    const finalScore = Math.min(99, Math.max(35, Math.round(score)));

    let highlightBadge = 'Përputhje e Mirë';
    if (finalScore >= 90) highlightBadge = '🌟 Përputhje Perfekte (Top Match)';
    else if (finalScore >= 80) highlightBadge = '✨ Shumë e Rekomanduar';
    else if (finalScore >= 65) highlightBadge = '👍 Alternativë e Mirë';

    return {
      listing,
      score: finalScore,
      matchReasons: matchReasons.slice(0, 4),
      highlightBadge
    };
  });

  // Sort descending by score
  return results.sort((a, b) => b.score - a.score);
};
