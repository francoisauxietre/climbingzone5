package com.climbingzone5.web.rest;

import com.climbingzone5.service.CardService;
import com.climbingzone5.web.rest.errors.BadRequestAlertException;
import com.climbingzone5.service.dto.CardDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.climbingzone5.domain.Card}.
 */
@RestController
@RequestMapping("/api")
public class CardResource {

    private final Logger log = LoggerFactory.getLogger(CardResource.class);

    private static final String ENTITY_NAME = "card";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CardService cardService;

    public CardResource(CardService cardService) {
        this.cardService = cardService;
    }

    /**
     * {@code POST  /cards} : Create a new card.
     *
     * @param cardDTO the cardDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cardDTO, or with status {@code 400 (Bad Request)} if the card has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cards")
    public ResponseEntity<CardDTO> createCard(@RequestBody CardDTO cardDTO) throws URISyntaxException {
        log.debug("REST request to save Card : {}", cardDTO);
        if (cardDTO.getId() != null) {
            throw new BadRequestAlertException("A new card cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardDTO result = cardService.save(cardDTO);
        return ResponseEntity.created(new URI("/api/cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cards} : Updates an existing card.
     *
     * @param cardDTO the cardDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cardDTO,
     * or with status {@code 400 (Bad Request)} if the cardDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cardDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cards")
    public ResponseEntity<CardDTO> updateCard(@RequestBody CardDTO cardDTO) throws URISyntaxException {
        log.debug("REST request to update Card : {}", cardDTO);
        if (cardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CardDTO result = cardService.save(cardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cardDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cards} : get all the cards.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cards in body.
     */
    @GetMapping("/cards")
    public List<CardDTO> getAllCards() {
        log.debug("REST request to get all Cards");
        return cardService.findAll();
    }

    /**
     * {@code GET  /cards/:id} : get the "id" card.
     *
     * @param id the id of the cardDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cardDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cards/{id}")
    public ResponseEntity<CardDTO> getCard(@PathVariable Long id) {
        log.debug("REST request to get Card : {}", id);
        Optional<CardDTO> cardDTO = cardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cardDTO);
    }

    /**
     * {@code DELETE  /cards/:id} : delete the "id" card.
     *
     * @param id the id of the cardDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cards/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        log.debug("REST request to delete Card : {}", id);
        cardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
