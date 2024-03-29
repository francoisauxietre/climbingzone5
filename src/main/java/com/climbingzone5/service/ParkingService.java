package com.climbingzone5.service;

import com.climbingzone5.domain.Parking;
import com.climbingzone5.repository.ParkingRepository;
import com.climbingzone5.service.dto.ParkingDTO;
import com.climbingzone5.service.mapper.ParkingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Parking}.
 */
@Service
@Transactional
public class ParkingService {

    private final Logger log = LoggerFactory.getLogger(ParkingService.class);

    private final ParkingRepository parkingRepository;

    private final ParkingMapper parkingMapper;

    public ParkingService(ParkingRepository parkingRepository, ParkingMapper parkingMapper) {
        this.parkingRepository = parkingRepository;
        this.parkingMapper = parkingMapper;
    }

    /**
     * Save a parking.
     *
     * @param parkingDTO the entity to save.
     * @return the persisted entity.
     */
    public ParkingDTO save(ParkingDTO parkingDTO) {
        log.debug("Request to save Parking : {}", parkingDTO);
        Parking parking = parkingMapper.toEntity(parkingDTO);
        parking = parkingRepository.save(parking);
        return parkingMapper.toDto(parking);
    }

    /**
     * Get all the parkings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ParkingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Parkings");
        return parkingRepository.findAll(pageable)
            .map(parkingMapper::toDto);
    }


    /**
     * Get one parking by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ParkingDTO> findOne(Long id) {
        log.debug("Request to get Parking : {}", id);
        return parkingRepository.findById(id)
            .map(parkingMapper::toDto);
    }

    /**
     * Delete the parking by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Parking : {}", id);
        parkingRepository.deleteById(id);
    }
}
