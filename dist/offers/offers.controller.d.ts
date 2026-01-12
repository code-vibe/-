import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
import { Offer } from './entities/offer.entity';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto): Promise<Offer>;
    findAll(loanId?: string): Promise<Offer[]>;
    getStats(): Promise<{
        totalOffers: number;
        byStatus: Record<string, number>;
        byOfferType: Record<string, number>;
        averageAmount: number;
        averageInterestRate: number;
        acceptanceRate: number;
    }>;
    findOne(id: string): Promise<Offer>;
    updateStatus(id: string, updateStatusDto: UpdateOfferStatusDto): Promise<Offer>;
    remove(id: string): Promise<void>;
}
