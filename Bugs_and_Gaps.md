# Identified Bugs & Gaps

## Functional Bugs
1. Duplicate submission possible on rapid double-click
2. Decision status not always persisted after refresh
3. Generic error shown instead of field-level validation

## Edge Cases Not Fully Handled
- Multiple tabs submitting simultaneously
- Unicode characters in name fields
- Very large loan amounts
- Network interruption during submission

## Requirement Gaps
- No max/min loan amount defined
- No OTP retry limit specified
- No timeout/retry policy documented
- No accessibility requirements
