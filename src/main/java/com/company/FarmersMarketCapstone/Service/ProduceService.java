package com.company.FarmersMarketCapstone.Service;

import com.company.FarmersMarketCapstone.DAO.ProduceRepository;
import com.company.FarmersMarketCapstone.DTO.Produce;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProduceService {

    @Autowired
    private ProduceRepository produceRepository;

    public List<Produce> getAllProduce() {
        return produceRepository.findAll();
    }

    public Produce addNewProduce(Produce produce) {
        return produceRepository.save(produce);
    }

    public void updateProduce(Produce produce, int id) {
        if (produce.getId() == id) {
            produceRepository.save(produce);
        }

    }

    public void deleteProduce(int id) {
        produceRepository.deleteById(id);
    }

}
