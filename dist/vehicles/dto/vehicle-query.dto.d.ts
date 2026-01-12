export declare class VehicleQueryDto {
    make?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    maxMileage?: number;
    condition?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    fuelType?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG' | 'LPG';
    transmission?: 'Manual' | 'Automatic' | 'CVT';
    bodyType?: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Truck' | 'Van';
    location?: string;
    verificationStatus?: 'Verified' | 'Pending' | 'Rejected' | 'Not Verified';
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'year' | 'mileage' | 'make' | 'model';
    sortOrder?: 'ASC' | 'DESC';
}
