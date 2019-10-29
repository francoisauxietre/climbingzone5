package com.climbingzone5.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_id")
    private Long cardId;

    @Column(name = "star")
    private Integer star;

    @Column(name = "level")
    private String level;

    @Column(name = "qrcode")
    private String qrcode;

    @Column(name = "climber_place")
    private Integer climberPlace;

    @Column(name = "climber_total")
    private Integer climberTotal;

    @Column(name = "place")
    private String place;

    @Column(name = "photo")
    private String photo;

    @Column(name = "climbing_route_name")
    private String climbingRouteName;

    @Column(name = "physical")
    private Integer physical;

    @Column(name = "technical")
    private Integer technical;

    @Column(name = "tactical")
    private Integer tactical;

    @Column(name = "mental")
    private Integer mental;

    @Column(name = "bonus")
    private String bonus;

    @Column(name = "climber_first_name")
    private String climberFirstName;

    @Column(name = "climber_last_name")
    private String climberLastName;

    @OneToMany(mappedBy = "cards")
    private Set<Climber> climbers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCardId() {
        return cardId;
    }

    public Card cardId(Long cardId) {
        this.cardId = cardId;
        return this;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Integer getStar() {
        return star;
    }

    public Card star(Integer star) {
        this.star = star;
        return this;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public String getLevel() {
        return level;
    }

    public Card level(String level) {
        this.level = level;
        return this;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getQrcode() {
        return qrcode;
    }

    public Card qrcode(String qrcode) {
        this.qrcode = qrcode;
        return this;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public Integer getClimberPlace() {
        return climberPlace;
    }

    public Card climberPlace(Integer climberPlace) {
        this.climberPlace = climberPlace;
        return this;
    }

    public void setClimberPlace(Integer climberPlace) {
        this.climberPlace = climberPlace;
    }

    public Integer getClimberTotal() {
        return climberTotal;
    }

    public Card climberTotal(Integer climberTotal) {
        this.climberTotal = climberTotal;
        return this;
    }

    public void setClimberTotal(Integer climberTotal) {
        this.climberTotal = climberTotal;
    }

    public String getPlace() {
        return place;
    }

    public Card place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getPhoto() {
        return photo;
    }

    public Card photo(String photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getClimbingRouteName() {
        return climbingRouteName;
    }

    public Card climbingRouteName(String climbingRouteName) {
        this.climbingRouteName = climbingRouteName;
        return this;
    }

    public void setClimbingRouteName(String climbingRouteName) {
        this.climbingRouteName = climbingRouteName;
    }

    public Integer getPhysical() {
        return physical;
    }

    public Card physical(Integer physical) {
        this.physical = physical;
        return this;
    }

    public void setPhysical(Integer physical) {
        this.physical = physical;
    }

    public Integer getTechnical() {
        return technical;
    }

    public Card technical(Integer technical) {
        this.technical = technical;
        return this;
    }

    public void setTechnical(Integer technical) {
        this.technical = technical;
    }

    public Integer getTactical() {
        return tactical;
    }

    public Card tactical(Integer tactical) {
        this.tactical = tactical;
        return this;
    }

    public void setTactical(Integer tactical) {
        this.tactical = tactical;
    }

    public Integer getMental() {
        return mental;
    }

    public Card mental(Integer mental) {
        this.mental = mental;
        return this;
    }

    public void setMental(Integer mental) {
        this.mental = mental;
    }

    public String getBonus() {
        return bonus;
    }

    public Card bonus(String bonus) {
        this.bonus = bonus;
        return this;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public String getClimberFirstName() {
        return climberFirstName;
    }

    public Card climberFirstName(String climberFirstName) {
        this.climberFirstName = climberFirstName;
        return this;
    }

    public void setClimberFirstName(String climberFirstName) {
        this.climberFirstName = climberFirstName;
    }

    public String getClimberLastName() {
        return climberLastName;
    }

    public Card climberLastName(String climberLastName) {
        this.climberLastName = climberLastName;
        return this;
    }

    public void setClimberLastName(String climberLastName) {
        this.climberLastName = climberLastName;
    }

    public Set<Climber> getClimbers() {
        return climbers;
    }

    public Card climbers(Set<Climber> climbers) {
        this.climbers = climbers;
        return this;
    }

    public Card addClimber(Climber climber) {
        this.climbers.add(climber);
        climber.setCards(this);
        return this;
    }

    public Card removeClimber(Climber climber) {
        this.climbers.remove(climber);
        climber.setCards(null);
        return this;
    }

    public void setClimbers(Set<Climber> climbers) {
        this.climbers = climbers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Card)) {
            return false;
        }
        return id != null && id.equals(((Card) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", cardId=" + getCardId() +
            ", star=" + getStar() +
            ", level='" + getLevel() + "'" +
            ", qrcode='" + getQrcode() + "'" +
            ", climberPlace=" + getClimberPlace() +
            ", climberTotal=" + getClimberTotal() +
            ", place='" + getPlace() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", climbingRouteName='" + getClimbingRouteName() + "'" +
            ", physical=" + getPhysical() +
            ", technical=" + getTechnical() +
            ", tactical=" + getTactical() +
            ", mental=" + getMental() +
            ", bonus='" + getBonus() + "'" +
            ", climberFirstName='" + getClimberFirstName() + "'" +
            ", climberLastName='" + getClimberLastName() + "'" +
            "}";
    }
}
