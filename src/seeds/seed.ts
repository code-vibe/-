import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { VehiclesService } from '../vehicles/vehicles.service';
import { ValuationsService } from '../valuations/valuations.service';
import { LoansService } from '../loans/loans.service';
import { Logger } from '@nestjs/common';

/**
 * Database seeder to populate the application with sample data
 * Useful for development, testing, and demonstrations
 */
async function seed() {
  const logger = new Logger('DatabaseSeeder');
  
  logger.log('🌱 Starting database seeding...');

  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const vehiclesService = app.get(VehiclesService);
    const valuationsService = app.get(ValuationsService);
    const loansService = app.get(LoansService);

    // Sample vehicles data
    const sampleVehicles = [
      {
        vin: '1HGCM82633A004352',
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: 35000,
        condition: 'Good' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 2.5,
        color: 'Silver',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Backup Camera'],
        location: 'Lagos, Nigeria',
        currentOwner: 'Toyota Lagos',
        previousOwners: 0,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '2T1BURHE5JC012345',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        mileage: 42000,
        condition: 'Excellent' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Manual' as const,
        engineSize: 1.8,
        color: 'Blue',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'Sunroof', 'Leather Seats'],
        location: 'Abuja, Nigeria',
        currentOwner: 'Private Seller',
        previousOwners: 1,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '3KPA24AD5KE987654',
        make: 'Hyundai',
        model: 'Elantra',
        year: 2021,
        mileage: 18000,
        condition: 'Excellent' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 2.0,
        color: 'White',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'Apple CarPlay', 'Android Auto', 'Lane Keep Assist'],
        location: 'Port Harcourt, Nigeria',
        currentOwner: 'Hyundai Dealership',
        previousOwners: 0,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '5NPE34AF4HH123456',
        make: 'Kia',
        model: 'Optima',
        year: 2017,
        mileage: 67000,
        condition: 'Good' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 2.4,
        color: 'Black',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'Heated Seats', 'Remote Start'],
        location: 'Kaduna, Nigeria',
        currentOwner: 'Pre-owned Dealer',
        previousOwners: 2,
        hasAccidentHistory: false,
        hasServiceHistory: false,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '1N4AL3AP8FC654321',
        make: 'Nissan',
        model: 'Altima',
        year: 2018,
        mileage: 55000,
        condition: 'Fair' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'CVT' as const,
        engineSize: 2.5,
        color: 'Red',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'Cruise Control'],
        location: 'Kano, Nigeria',
        currentOwner: 'Individual Seller',
        previousOwners: 3,
        hasAccidentHistory: true,
        hasServiceHistory: false,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Uninsured' as const,
      },
      {
        vin: '1FM5K8D86KGA11111',
        make: 'Ford',
        model: 'Explorer',
        year: 2020,
        mileage: 28000,
        condition: 'Good' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 3.5,
        color: 'Gray',
        doors: 4,
        bodyType: 'SUV' as const,
        features: ['Air Conditioning', '4WD', 'Third Row Seating', 'Towing Package'],
        location: 'Lagos, Nigeria',
        currentOwner: 'Ford Dealership',
        previousOwners: 0,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '3VWC57BU8KM222222',
        make: 'Volkswagen',
        model: 'Passat',
        year: 2019,
        mileage: 39000,
        condition: 'Good' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 2.0,
        color: 'Silver',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'Turbo Engine', 'Premium Audio'],
        location: 'Abuja, Nigeria',
        currentOwner: 'VW Certified Pre-owned',
        previousOwners: 1,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '4T1BF1FK5KU333333',
        make: 'Toyota',
        model: 'Corolla',
        year: 2021,
        mileage: 15000,
        condition: 'Excellent' as const,
        fuelType: 'Hybrid' as const,
        transmission: 'CVT' as const,
        engineSize: 1.8,
        color: 'White',
        doors: 4,
        bodyType: 'Sedan' as const,
        features: ['Air Conditioning', 'Hybrid System', 'Lane Departure Warning', 'Automatic Emergency Braking'],
        location: 'Lagos, Nigeria',
        currentOwner: 'Toyota Dealer',
        previousOwners: 0,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      },
      {
        vin: '19UUB2F39LA444444',
        make: 'Honda',
        model: 'Pilot',
        year: 2016,
        mileage: 89000,
        condition: 'Fair' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 3.5,
        color: 'Blue',
        doors: 4,
        bodyType: 'SUV' as const,
        features: ['Air Conditioning', 'Third Row', 'AWD'],
        location: 'Ibadan, Nigeria',
        currentOwner: 'Used Car Lot',
        previousOwners: 4,
        hasAccidentHistory: true,
        hasServiceHistory: false,
        registrationStatus: 'Expired' as const,
        insuranceStatus: 'Uninsured' as const,
      },
      {
        vin: 'KMHD14JA5KA555555',
        make: 'Hyundai',
        model: 'Tucson',
        year: 2022,
        mileage: 8000,
        condition: 'Excellent' as const,
        fuelType: 'Gasoline' as const,
        transmission: 'Automatic' as const,
        engineSize: 2.5,
        color: 'Black',
        doors: 4,
        bodyType: 'SUV' as const,
        features: ['Air Conditioning', 'AWD', 'Wireless Charging', 'Panoramic Sunroof', 'Premium Sound'],
        location: 'Lagos, Nigeria',
        currentOwner: 'Hyundai Lagos',
        previousOwners: 0,
        hasAccidentHistory: false,
        hasServiceHistory: true,
        registrationStatus: 'Active' as const,
        insuranceStatus: 'Insured' as const,
      }
    ];

    // Seed vehicles
    logger.log('Creating sample vehicles...');
    const createdVehicles = [];
    for (const vehicleData of sampleVehicles) {
      try {
        const vehicle = await vehiclesService.create(vehicleData);
        createdVehicles.push(vehicle);
        logger.log(`✅ Created vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model} (VIN: ${vehicle.vin})`);
      } catch (error) {
        logger.warn(`⚠️ Failed to create vehicle with VIN ${vehicleData.vin}: ${error.message}`);
      }
    }

    // Seed valuations for each vehicle
    logger.log('Creating valuations for vehicles...');
    for (const vehicle of createdVehicles) {
      try {
        const valuation = await valuationsService.create({
          vehicleId: vehicle.id,
          requestedBy: 'system-seeder',
          notes: `Auto-generated valuation for ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        });
        logger.log(`✅ Created valuation for ${vehicle.make} ${vehicle.model}: ${valuation.estimatedValue} ${valuation.currency}`);
      } catch (error) {
        logger.warn(`⚠️ Failed to create valuation for vehicle ${vehicle.id}: ${error.message}`);
      }
    }

    // Sample loan applications
    const sampleLoans = [
      {
        vehicleId: createdVehicles[0]?.id, // Toyota Camry
        requestedAmount: 12000000,
        requestedTermMonths: 48,
        applicantFirstName: 'Adebayo',
        applicantLastName: 'Johnson',
        applicantEmail: 'adebayo.johnson@email.com',
        applicantPhone: '+2348123456789',
        applicantDateOfBirth: '1985-03-15',
        applicantNationalId: '12345678901',
        applicantAddress: '45 Victoria Island Road, Lagos State, Nigeria',
        employmentStatus: 'Employed' as const,
        monthlyIncome: 750000,
        employerName: 'Sterling Bank Plc',
        yearsAtCurrentJob: 5.5,
        existingDebtObligations: 200000,
        downPayment: 2000000,
        creditScore: 720,
        supportingDocuments: ['ID_CARD', 'SALARY_SLIP', 'BANK_STATEMENT', 'EMPLOYMENT_LETTER'],
        notes: 'Stable employment, good credit history'
      },
      {
        vehicleId: createdVehicles[1]?.id, // Honda Civic
        requestedAmount: 8500000,
        requestedTermMonths: 36,
        applicantFirstName: 'Fatima',
        applicantLastName: 'Abdullahi',
        applicantEmail: 'fatima.abdullahi@email.com',
        applicantPhone: '+2347098765432',
        applicantDateOfBirth: '1992-08-22',
        applicantNationalId: '23456789012',
        applicantAddress: '12 Maitama District, Abuja, FCT, Nigeria',
        employmentStatus: 'Self Employed' as const,
        monthlyIncome: 450000,
        yearsAtCurrentJob: 2.0,
        existingDebtObligations: 100000,
        downPayment: 1500000,
        supportingDocuments: ['ID_CARD', 'BUSINESS_REGISTRATION', 'BANK_STATEMENT'],
        notes: 'Self-employed business owner, consistent income'
      },
      {
        vehicleId: createdVehicles[2]?.id, // Hyundai Elantra  
        requestedAmount: 15000000,
        requestedTermMonths: 60,
        applicantFirstName: 'Chukwuma',
        applicantLastName: 'Okafor',
        applicantEmail: 'chukwuma.okafor@email.com',
        applicantPhone: '+2348087654321',
        applicantDateOfBirth: '1988-11-10',
        applicantNationalId: '34567890123',
        applicantAddress: '78 GRA Phase 2, Port Harcourt, Rivers State, Nigeria',
        employmentStatus: 'Employed' as const,
        monthlyIncome: 1200000,
        employerName: 'Shell Nigeria',
        yearsAtCurrentJob: 8.0,
        existingDebtObligations: 350000,
        downPayment: 3000000,
        creditScore: 680,
        supportingDocuments: ['ID_CARD', 'SALARY_SLIP', 'BANK_STATEMENT', 'EMPLOYMENT_LETTER', 'UTILITY_BILL'],
        notes: 'High-income earner, works for multinational company'
      },
      {
        vehicleId: createdVehicles[3]?.id, // Kia Optima
        requestedAmount: 6000000,
        requestedTermMonths: 24,
        applicantFirstName: 'Aisha',
        applicantLastName: 'Musa',
        applicantEmail: 'aisha.musa@email.com',
        applicantPhone: '+2348123459876',
        applicantDateOfBirth: '1995-06-05',
        applicantNationalId: '45678901234',
        applicantAddress: '23 Barnawa Layout, Kaduna State, Nigeria',
        employmentStatus: 'Employed' as const,
        monthlyIncome: 280000,
        employerName: 'Kaduna State University',
        yearsAtCurrentJob: 1.5,
        existingDebtObligations: 80000,
        downPayment: 1000000,
        creditScore: 640,
        supportingDocuments: ['ID_CARD', 'SALARY_SLIP', 'BANK_STATEMENT'],
        notes: 'Young professional, first-time car buyer'
      },
      {
        vehicleId: createdVehicles[4]?.id, // Nissan Altima
        requestedAmount: 7500000,
        requestedTermMonths: 42,
        applicantFirstName: 'Emeka',
        applicantLastName: 'Ugwu',
        applicantEmail: 'emeka.ugwu@email.com',
        applicantPhone: '+2347065432189',
        applicantDateOfBirth: '1980-12-18',
        applicantNationalId: '56789012345',
        applicantAddress: '67 Sabon Gari, Kano State, Nigeria',
        employmentStatus: 'Self Employed' as const,
        monthlyIncome: 320000,
        yearsAtCurrentJob: 10.0,
        existingDebtObligations: 150000,
        downPayment: 500000,
        supportingDocuments: ['ID_CARD', 'TAX_CLEARANCE', 'BANK_STATEMENT'],
        notes: 'Long-term self-employed, moderate income'
      }
    ];

    // Seed loan applications
    logger.log('Creating sample loan applications...');
    const createdLoans = [];
    for (const loanData of sampleLoans) {
      if (loanData.vehicleId) {
        try {
          const loan = await loansService.create(loanData);
          createdLoans.push(loan);
          logger.log(`✅ Created loan application: ${loan.applicationNumber} for ${loanData.applicantFirstName} ${loanData.applicantLastName}`);
        } catch (error) {
          logger.warn(`⚠️ Failed to create loan application: ${error.message}`);
        }
      }
    }

    // Update some loan statuses to show workflow
    if (createdLoans.length > 0) {
      try {
        // Approve first loan
        await loansService.updateStatus(createdLoans[0].id, {
          status: 'Approved',
          processingStage: 'Final Approval',
          assignedOfficer: 'loan.officer@autochek.com',
          notes: 'Excellent credit profile, approved with standard terms'
        });
        logger.log(`✅ Approved loan: ${createdLoans[0].applicationNumber}`);

        // Reject one loan
        if (createdLoans[4]) {
          await loansService.updateStatus(createdLoans[4].id, {
            status: 'Rejected',
            processingStage: 'Initial Review',
            rejectionReason: 'Debt-to-income ratio exceeds acceptable limits',
            assignedOfficer: 'loan.officer@autochek.com'
          });
          logger.log(`✅ Rejected loan: ${createdLoans[4].applicationNumber}`);
        }

        // Set others to different stages
        if (createdLoans[1]) {
          await loansService.updateStatus(createdLoans[1].id, {
            status: 'Under Review',
            processingStage: 'Document Verification',
            assignedOfficer: 'document.reviewer@autochek.com'
          });
          logger.log(`✅ Updated loan status: ${createdLoans[1].applicationNumber}`);
        }

        if (createdLoans[2]) {
          await loansService.updateStatus(createdLoans[2].id, {
            status: 'Under Review',
            processingStage: 'Credit Check',
            assignedOfficer: 'credit.analyst@autochek.com'
          });
          logger.log(`✅ Updated loan status: ${createdLoans[2].applicationNumber}`);
        }

      } catch (error) {
        logger.warn(`⚠️ Failed to update some loan statuses: ${error.message}`);
      }
    }

    logger.log('✨ Database seeding completed successfully!');
    logger.log('📊 Summary:');
    logger.log(`   • ${createdVehicles.length} vehicles created`);
    logger.log(`   • ${createdVehicles.length} valuations generated`);  
    logger.log(`   • ${createdLoans.length} loan applications created`);
    logger.log('');
    logger.log('🚀 You can now:');
    logger.log('   • Browse vehicles at: GET /api/v1/vehicles');
    logger.log('   • Check valuations at: GET /api/v1/valuations');
    logger.log('   • View loan applications at: GET /api/v1/loans');
    logger.log('   • Access API docs at: http://localhost:3000/api/docs');

  } catch (error) {
    logger.error('❌ Database seeding failed:', error.message);
    throw error;
  } finally {
    await app.close();
  }
}

// Run the seeder
seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
