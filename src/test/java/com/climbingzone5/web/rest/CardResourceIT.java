package com.climbingzone5.web.rest;

import com.climbingzone5.Climbingzone5App;
import com.climbingzone5.domain.Card;
import com.climbingzone5.repository.CardRepository;
import com.climbingzone5.service.CardService;
import com.climbingzone5.service.dto.CardDTO;
import com.climbingzone5.service.mapper.CardMapper;
import com.climbingzone5.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.climbingzone5.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CardResource} REST controller.
 */
@SpringBootTest(classes = Climbingzone5App.class)
public class CardResourceIT {

    private static final Long DEFAULT_CARD_ID = 1L;
    private static final Long UPDATED_CARD_ID = 2L;

    private static final Integer DEFAULT_STAR = 1;
    private static final Integer UPDATED_STAR = 2;

    private static final String DEFAULT_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL = "BBBBBBBBBB";

    private static final String DEFAULT_QRCODE = "AAAAAAAAAA";
    private static final String UPDATED_QRCODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLIMBER_PLACE = 1;
    private static final Integer UPDATED_CLIMBER_PLACE = 2;

    private static final Integer DEFAULT_CLIMBER_TOTAL = 1;
    private static final Integer UPDATED_CLIMBER_TOTAL = 2;

    private static final String DEFAULT_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_PLACE = "BBBBBBBBBB";

    private static final String DEFAULT_PHOTO = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO = "BBBBBBBBBB";

    private static final String DEFAULT_CLIMBING_ROUTE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLIMBING_ROUTE_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHYSICAL = 1;
    private static final Integer UPDATED_PHYSICAL = 2;

    private static final Integer DEFAULT_TECHNICAL = 1;
    private static final Integer UPDATED_TECHNICAL = 2;

    private static final Integer DEFAULT_TACTICAL = 1;
    private static final Integer UPDATED_TACTICAL = 2;

    private static final Integer DEFAULT_MENTAL = 1;
    private static final Integer UPDATED_MENTAL = 2;

    private static final String DEFAULT_BONUS = "AAAAAAAAAA";
    private static final String UPDATED_BONUS = "BBBBBBBBBB";

    private static final String DEFAULT_CLIMBER_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLIMBER_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CLIMBER_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CLIMBER_LAST_NAME = "BBBBBBBBBB";

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CardMapper cardMapper;

    @Autowired
    private CardService cardService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCardMockMvc;

    private Card card;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardResource cardResource = new CardResource(cardService);
        this.restCardMockMvc = MockMvcBuilders.standaloneSetup(cardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Card createEntity(EntityManager em) {
        Card card = new Card()
            .cardId(DEFAULT_CARD_ID)
            .star(DEFAULT_STAR)
            .level(DEFAULT_LEVEL)
            .qrcode(DEFAULT_QRCODE)
            .climberPlace(DEFAULT_CLIMBER_PLACE)
            .climberTotal(DEFAULT_CLIMBER_TOTAL)
            .place(DEFAULT_PLACE)
            .photo(DEFAULT_PHOTO)
            .climbingRouteName(DEFAULT_CLIMBING_ROUTE_NAME)
            .physical(DEFAULT_PHYSICAL)
            .technical(DEFAULT_TECHNICAL)
            .tactical(DEFAULT_TACTICAL)
            .mental(DEFAULT_MENTAL)
            .bonus(DEFAULT_BONUS)
            .climberFirstName(DEFAULT_CLIMBER_FIRST_NAME)
            .climberLastName(DEFAULT_CLIMBER_LAST_NAME);
        return card;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Card createUpdatedEntity(EntityManager em) {
        Card card = new Card()
            .cardId(UPDATED_CARD_ID)
            .star(UPDATED_STAR)
            .level(UPDATED_LEVEL)
            .qrcode(UPDATED_QRCODE)
            .climberPlace(UPDATED_CLIMBER_PLACE)
            .climberTotal(UPDATED_CLIMBER_TOTAL)
            .place(UPDATED_PLACE)
            .photo(UPDATED_PHOTO)
            .climbingRouteName(UPDATED_CLIMBING_ROUTE_NAME)
            .physical(UPDATED_PHYSICAL)
            .technical(UPDATED_TECHNICAL)
            .tactical(UPDATED_TACTICAL)
            .mental(UPDATED_MENTAL)
            .bonus(UPDATED_BONUS)
            .climberFirstName(UPDATED_CLIMBER_FIRST_NAME)
            .climberLastName(UPDATED_CLIMBER_LAST_NAME);
        return card;
    }

    @BeforeEach
    public void initTest() {
        card = createEntity(em);
    }

    @Test
    @Transactional
    public void createCard() throws Exception {
        int databaseSizeBeforeCreate = cardRepository.findAll().size();

        // Create the Card
        CardDTO cardDTO = cardMapper.toDto(card);
        restCardMockMvc.perform(post("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardDTO)))
            .andExpect(status().isCreated());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeCreate + 1);
        Card testCard = cardList.get(cardList.size() - 1);
        assertThat(testCard.getCardId()).isEqualTo(DEFAULT_CARD_ID);
        assertThat(testCard.getStar()).isEqualTo(DEFAULT_STAR);
        assertThat(testCard.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testCard.getQrcode()).isEqualTo(DEFAULT_QRCODE);
        assertThat(testCard.getClimberPlace()).isEqualTo(DEFAULT_CLIMBER_PLACE);
        assertThat(testCard.getClimberTotal()).isEqualTo(DEFAULT_CLIMBER_TOTAL);
        assertThat(testCard.getPlace()).isEqualTo(DEFAULT_PLACE);
        assertThat(testCard.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testCard.getClimbingRouteName()).isEqualTo(DEFAULT_CLIMBING_ROUTE_NAME);
        assertThat(testCard.getPhysical()).isEqualTo(DEFAULT_PHYSICAL);
        assertThat(testCard.getTechnical()).isEqualTo(DEFAULT_TECHNICAL);
        assertThat(testCard.getTactical()).isEqualTo(DEFAULT_TACTICAL);
        assertThat(testCard.getMental()).isEqualTo(DEFAULT_MENTAL);
        assertThat(testCard.getBonus()).isEqualTo(DEFAULT_BONUS);
        assertThat(testCard.getClimberFirstName()).isEqualTo(DEFAULT_CLIMBER_FIRST_NAME);
        assertThat(testCard.getClimberLastName()).isEqualTo(DEFAULT_CLIMBER_LAST_NAME);
    }

    @Test
    @Transactional
    public void createCardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardRepository.findAll().size();

        // Create the Card with an existing ID
        card.setId(1L);
        CardDTO cardDTO = cardMapper.toDto(card);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardMockMvc.perform(post("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCards() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);

        // Get all the cardList
        restCardMockMvc.perform(get("/api/cards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(card.getId().intValue())))
            .andExpect(jsonPath("$.[*].cardId").value(hasItem(DEFAULT_CARD_ID.intValue())))
            .andExpect(jsonPath("$.[*].star").value(hasItem(DEFAULT_STAR)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)))
            .andExpect(jsonPath("$.[*].qrcode").value(hasItem(DEFAULT_QRCODE)))
            .andExpect(jsonPath("$.[*].climberPlace").value(hasItem(DEFAULT_CLIMBER_PLACE)))
            .andExpect(jsonPath("$.[*].climberTotal").value(hasItem(DEFAULT_CLIMBER_TOTAL)))
            .andExpect(jsonPath("$.[*].place").value(hasItem(DEFAULT_PLACE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.[*].climbingRouteName").value(hasItem(DEFAULT_CLIMBING_ROUTE_NAME)))
            .andExpect(jsonPath("$.[*].physical").value(hasItem(DEFAULT_PHYSICAL)))
            .andExpect(jsonPath("$.[*].technical").value(hasItem(DEFAULT_TECHNICAL)))
            .andExpect(jsonPath("$.[*].tactical").value(hasItem(DEFAULT_TACTICAL)))
            .andExpect(jsonPath("$.[*].mental").value(hasItem(DEFAULT_MENTAL)))
            .andExpect(jsonPath("$.[*].bonus").value(hasItem(DEFAULT_BONUS)))
            .andExpect(jsonPath("$.[*].climberFirstName").value(hasItem(DEFAULT_CLIMBER_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].climberLastName").value(hasItem(DEFAULT_CLIMBER_LAST_NAME)));
    }
    
    @Test
    @Transactional
    public void getCard() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);

        // Get the card
        restCardMockMvc.perform(get("/api/cards/{id}", card.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(card.getId().intValue()))
            .andExpect(jsonPath("$.cardId").value(DEFAULT_CARD_ID.intValue()))
            .andExpect(jsonPath("$.star").value(DEFAULT_STAR))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL))
            .andExpect(jsonPath("$.qrcode").value(DEFAULT_QRCODE))
            .andExpect(jsonPath("$.climberPlace").value(DEFAULT_CLIMBER_PLACE))
            .andExpect(jsonPath("$.climberTotal").value(DEFAULT_CLIMBER_TOTAL))
            .andExpect(jsonPath("$.place").value(DEFAULT_PLACE))
            .andExpect(jsonPath("$.photo").value(DEFAULT_PHOTO))
            .andExpect(jsonPath("$.climbingRouteName").value(DEFAULT_CLIMBING_ROUTE_NAME))
            .andExpect(jsonPath("$.physical").value(DEFAULT_PHYSICAL))
            .andExpect(jsonPath("$.technical").value(DEFAULT_TECHNICAL))
            .andExpect(jsonPath("$.tactical").value(DEFAULT_TACTICAL))
            .andExpect(jsonPath("$.mental").value(DEFAULT_MENTAL))
            .andExpect(jsonPath("$.bonus").value(DEFAULT_BONUS))
            .andExpect(jsonPath("$.climberFirstName").value(DEFAULT_CLIMBER_FIRST_NAME))
            .andExpect(jsonPath("$.climberLastName").value(DEFAULT_CLIMBER_LAST_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingCard() throws Exception {
        // Get the card
        restCardMockMvc.perform(get("/api/cards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCard() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);

        int databaseSizeBeforeUpdate = cardRepository.findAll().size();

        // Update the card
        Card updatedCard = cardRepository.findById(card.getId()).get();
        // Disconnect from session so that the updates on updatedCard are not directly saved in db
        em.detach(updatedCard);
        updatedCard
            .cardId(UPDATED_CARD_ID)
            .star(UPDATED_STAR)
            .level(UPDATED_LEVEL)
            .qrcode(UPDATED_QRCODE)
            .climberPlace(UPDATED_CLIMBER_PLACE)
            .climberTotal(UPDATED_CLIMBER_TOTAL)
            .place(UPDATED_PLACE)
            .photo(UPDATED_PHOTO)
            .climbingRouteName(UPDATED_CLIMBING_ROUTE_NAME)
            .physical(UPDATED_PHYSICAL)
            .technical(UPDATED_TECHNICAL)
            .tactical(UPDATED_TACTICAL)
            .mental(UPDATED_MENTAL)
            .bonus(UPDATED_BONUS)
            .climberFirstName(UPDATED_CLIMBER_FIRST_NAME)
            .climberLastName(UPDATED_CLIMBER_LAST_NAME);
        CardDTO cardDTO = cardMapper.toDto(updatedCard);

        restCardMockMvc.perform(put("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardDTO)))
            .andExpect(status().isOk());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeUpdate);
        Card testCard = cardList.get(cardList.size() - 1);
        assertThat(testCard.getCardId()).isEqualTo(UPDATED_CARD_ID);
        assertThat(testCard.getStar()).isEqualTo(UPDATED_STAR);
        assertThat(testCard.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testCard.getQrcode()).isEqualTo(UPDATED_QRCODE);
        assertThat(testCard.getClimberPlace()).isEqualTo(UPDATED_CLIMBER_PLACE);
        assertThat(testCard.getClimberTotal()).isEqualTo(UPDATED_CLIMBER_TOTAL);
        assertThat(testCard.getPlace()).isEqualTo(UPDATED_PLACE);
        assertThat(testCard.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testCard.getClimbingRouteName()).isEqualTo(UPDATED_CLIMBING_ROUTE_NAME);
        assertThat(testCard.getPhysical()).isEqualTo(UPDATED_PHYSICAL);
        assertThat(testCard.getTechnical()).isEqualTo(UPDATED_TECHNICAL);
        assertThat(testCard.getTactical()).isEqualTo(UPDATED_TACTICAL);
        assertThat(testCard.getMental()).isEqualTo(UPDATED_MENTAL);
        assertThat(testCard.getBonus()).isEqualTo(UPDATED_BONUS);
        assertThat(testCard.getClimberFirstName()).isEqualTo(UPDATED_CLIMBER_FIRST_NAME);
        assertThat(testCard.getClimberLastName()).isEqualTo(UPDATED_CLIMBER_LAST_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCard() throws Exception {
        int databaseSizeBeforeUpdate = cardRepository.findAll().size();

        // Create the Card
        CardDTO cardDTO = cardMapper.toDto(card);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCardMockMvc.perform(put("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCard() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);

        int databaseSizeBeforeDelete = cardRepository.findAll().size();

        // Delete the card
        restCardMockMvc.perform(delete("/api/cards/{id}", card.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Card.class);
        Card card1 = new Card();
        card1.setId(1L);
        Card card2 = new Card();
        card2.setId(card1.getId());
        assertThat(card1).isEqualTo(card2);
        card2.setId(2L);
        assertThat(card1).isNotEqualTo(card2);
        card1.setId(null);
        assertThat(card1).isNotEqualTo(card2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardDTO.class);
        CardDTO cardDTO1 = new CardDTO();
        cardDTO1.setId(1L);
        CardDTO cardDTO2 = new CardDTO();
        assertThat(cardDTO1).isNotEqualTo(cardDTO2);
        cardDTO2.setId(cardDTO1.getId());
        assertThat(cardDTO1).isEqualTo(cardDTO2);
        cardDTO2.setId(2L);
        assertThat(cardDTO1).isNotEqualTo(cardDTO2);
        cardDTO1.setId(null);
        assertThat(cardDTO1).isNotEqualTo(cardDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cardMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cardMapper.fromId(null)).isNull();
    }
}
