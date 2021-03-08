package com.company.FarmersMarketCapstone.Controller;

import com.company.FarmersMarketCapstone.DTO.Produce;
import com.company.FarmersMarketCapstone.Service.ProduceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProduceController {

    @Autowired
    private ProduceService produceService;

    @RequestMapping(value = "/produce", method = RequestMethod.GET)
    public List<Produce> getAllProduce() {
        return produceService.getAllProduce();
    }

    @RequestMapping(value = "/produce", method = RequestMethod.POST)
    public Produce addNewProduce(@RequestBody Produce produce) {
        return produceService.addNewProduce(produce);
    }

    @RequestMapping(value = "/produce/{id}", method = RequestMethod.PUT)
    public void updateProduce(@RequestBody Produce produce, @PathVariable int id) {
        produceService.updateProduce(produce, id);
    }

    @RequestMapping(value = "/produce/{id}", method = RequestMethod.DELETE)
    public void deleteProduce(@PathVariable int id){
        produceService.deleteProduce(id);
    }

}
