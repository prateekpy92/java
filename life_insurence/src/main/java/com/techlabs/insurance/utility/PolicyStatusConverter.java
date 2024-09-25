package com.techlabs.insurance.utility;

import com.techlabs.insurance.entity.PolicyStatus;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PolicyStatusConverter implements AttributeConverter<PolicyStatus, Byte> {

    @Override
    public Byte convertToDatabaseColumn(PolicyStatus attribute) {
        if (attribute == null) {
            return null;
        }
        switch (attribute) {
            case ACTIVE: return 1;
            case PENDING: return 0;
            case REJECT: return 2;
            case COMPLETE: return 3;
            case DROP: return 4;
            case CLAIMED: return 5;
            case WITHDRAWN: return 6;
            default: throw new IllegalArgumentException("Unknown status: " + attribute);
        }
    }

    @Override
    public PolicyStatus convertToEntityAttribute(Byte dbData) {
        if (dbData == null) {
            return null;
        }
        switch (dbData) {
            case 0: return PolicyStatus.PENDING;
            case 1: return PolicyStatus.ACTIVE;
            case 2: return PolicyStatus.REJECT;
            case 3: return PolicyStatus.COMPLETE;
            case 4: return PolicyStatus.DROP;
            case 5: return PolicyStatus.CLAIMED;
            case 6: return PolicyStatus.WITHDRAWN;
            default: throw new IllegalArgumentException("Unknown status code: " + dbData);
        }
    }
}

