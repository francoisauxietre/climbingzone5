package com.climbingzone5.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.climbingzone5.domain.Card} entity.
 */
public class CardDTO implements Serializable {

    private Long id;

    private Long cardId;

    private Integer star;

    private String level;

    private String qrcode;

    private Integer climberPlace;

    private Integer climberTotal;

    private String place;

    private String photo;

    private String climbingRouteName;

    private Integer physical;

    private Integer technical;

    private Integer tactical;

    private Integer mental;

    private String bonus;

    private String climberFirstName;

    private String climberLastName;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getQrcode() {
        return qrcode;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public Integer getClimberPlace() {
        return climberPlace;
    }

    public void setClimberPlace(Integer climberPlace) {
        this.climberPlace = climberPlace;
    }

    public Integer getClimberTotal() {
        return climberTotal;
    }

    public void setClimberTotal(Integer climberTotal) {
        this.climberTotal = climberTotal;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getClimbingRouteName() {
        return climbingRouteName;
    }

    public void setClimbingRouteName(String climbingRouteName) {
        this.climbingRouteName = climbingRouteName;
    }

    public Integer getPhysical() {
        return physical;
    }

    public void setPhysical(Integer physical) {
        this.physical = physical;
    }

    public Integer getTechnical() {
        return technical;
    }

    public void setTechnical(Integer technical) {
        this.technical = technical;
    }

    public Integer getTactical() {
        return tactical;
    }

    public void setTactical(Integer tactical) {
        this.tactical = tactical;
    }

    public Integer getMental() {
        return mental;
    }

    public void setMental(Integer mental) {
        this.mental = mental;
    }

    public String getBonus() {
        return bonus;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public String getClimberFirstName() {
        return climberFirstName;
    }

    public void setClimberFirstName(String climberFirstName) {
        this.climberFirstName = climberFirstName;
    }

    public String getClimberLastName() {
        return climberLastName;
    }

    public void setClimberLastName(String climberLastName) {
        this.climberLastName = climberLastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CardDTO cardDTO = (CardDTO) o;
        if (cardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CardDTO{" +
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
