"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateValuationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_valuation_dto_1 = require("./create-valuation.dto");
class UpdateValuationDto extends (0, swagger_1.PartialType)(create_valuation_dto_1.CreateValuationDto) {
}
exports.UpdateValuationDto = UpdateValuationDto;
//# sourceMappingURL=update-valuation.dto.js.map