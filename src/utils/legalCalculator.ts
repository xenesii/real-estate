import { NotaryEstimate } from '../types';

export function calculateNotaryAndLegalFees(price: number, country: 'Kosovo' | 'Albania'): NotaryEstimate {
  if (price <= 0) {
    return {
      propertyPrice: 0,
      country,
      notaryFee: 0,
      cadastralTax: 0,
      transferTax: 0,
      administrativeFee: 0,
      totalEstimatedCost: 0,
      notes: []
    };
  }

  if (country === 'Kosovo') {
    // Kosovo Notary Tariffs (Oda e Noterëve të Kosovës)
    let notaryFee = 150;
    if (price <= 15000) {
      notaryFee = 80;
    } else if (price <= 30000) {
      notaryFee = 120;
    } else if (price <= 50000) {
      notaryFee = 180;
    } else if (price <= 100000) {
      notaryFee = 280;
    } else if (price <= 200000) {
      notaryFee = 380;
    } else if (price <= 300000) {
      notaryFee = 480;
    } else {
      const extraTiers = Math.floor((price - 300000) / 50000);
      notaryFee = Math.min(750, 480 + (extraTiers * 40));
    }

    // Agjencia Kadastrale e Kosovës (AKK) Registration Fee
    const cadastralTax = price < 80000 ? 150 : 250;
    const administrativeFee = 45; // pullat takse, vërtetime komunale, verifikim hipotekash
    const transferTax = 0; // Në Kosovë nuk ka tatim mbi kalimin e pronësisë për blerësin privat

    const totalEstimatedCost = Math.round(notaryFee + cadastralTax + administrativeFee);

    return {
      propertyPrice: price,
      country,
      notaryFee,
      cadastralTax,
      transferTax,
      administrativeFee,
      totalEstimatedCost,
      notes: [
        'Tarifa e noterit përfshin përpilimin, aktnoterialin e shitblerjes dhe depozitimin.',
        'Regjistrimi në Agjencinë Kadastrale të Kosovës (AKK) bëhet automatikisht nga zyra noteriale brenda 15 ditësh.',
        'Nuk ka tatim mbi transferin e pronësisë për blerësin në Kosovë (vetëm taksa kadastrale fikse).',
        'Shitësi duhet të paraqesë vërtetimin nga Drejtoria e Tatimit në Pronë që nuk ka borxhe tatimore të papaguara.'
      ]
    };
  } else {
    // Albania Notary Tariffs (Dhoma Kombëtare e Noterisë & ASHK)
    let notaryFee = 120;
    if (price <= 30000) {
      notaryFee = 120;
    } else if (price <= 60000) {
      notaryFee = 220;
    } else if (price <= 120000) {
      notaryFee = 340;
    } else if (price <= 250000) {
      notaryFee = 480;
    } else {
      notaryFee = Math.round(price * 0.0025);
    }

    const cadastralTax = 90; // Tarifat e shërbimit në Agjencinë Shtetërore të Kadastrës (ASHK)
    const administrativeFee = 35; // Nxjerrje kartele, vërtetim kufijsh, vulosje digjitale
    const transferTax = 0; // Për blerësin; tatimi në fitim kapital 15% mbahet nga shitësi mbi diferencën e çmimit

    const totalEstimatedCost = Math.round(notaryFee + cadastralTax + administrativeFee);

    return {
      propertyPrice: price,
      country,
      notaryFee,
      cadastralTax,
      transferTax,
      administrativeFee,
      totalEstimatedCost,
      notes: [
        'Transaksioni kryhet pranë noterit të licencuar dhe regjistrohet online në sistemin e ASHK-së.',
        'Tarifa e Kadastrës përfshin lëshimin e Çertifikatës së re të Pronësisë me kod QR dhe vulë elektronike.',
        'Pagesat mbi 1,000,000 Lek (ose ekuivalenti në Euro) me ligj kryhen vetëm përmes llogarisë së posaçme escrow të noterit.',
        'Për pronat në ndërtim e sipër, rekomandohet aktnoterial i regjistruar për kontratën e porosisë.'
      ]
    };
  }
}
