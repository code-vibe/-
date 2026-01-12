import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Loan } from '../loans/entities/loan.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
export declare class OffersService {
    private offerRepository;
    private loanRepository;
    private readonly logger;
    constructor(offerRepository: Repository<Offer>, loanRepository: Repository<Loan>);
    create(createOfferDto: CreateOfferDto): Promise<Offer>;
    findAll(loanId?: string): Promise<Offer[]>;
    findOne(id: string): Promise<Offer>;
    updateStatus(id: string, updateStatusDto: UpdateOfferStatusDto): Promise<Offer>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        totalOffers: number;
        byStatus: Record<string, number>;
        byOfferType: Record<string, number>;
        averageAmount: number;
        averageInterestRate: number;
        acceptanceRate: number;
    }>;
    private generateOfferNumber;
    private calculateOfferTerms;
    private calculateAPR;
    private calculateProcessingFee;
    private isValidStatusTransition;
}
