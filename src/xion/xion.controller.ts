import { Controller, Get } from '@nestjs/common';
import { XionService} from './xion.service';

@Controller('xion')
export class XionController {
    constructor(private readonly xionService:XionService){}

    
    @Get('xgt/circulation')
    getTotalCirculation(){
        return this.xionService.getCirculation;
    }
    @Get('xgt/total_supply')
    getTotalSupply(){
        return {"ss":"sds"};
    }
    @Get('xgt/price')
    getPrice(){
        return {"ss":"sds"};
    }
}
