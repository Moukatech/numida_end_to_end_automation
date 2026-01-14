# Identified Bugs & Gaps

## Functional Bugs [UI]
1. No correct error messages is displayed when date of birth is below 18
2. A user can submit the same national id over and over gain.
3. Email should be unique for each new user.
4. Incorrect submission time is displayed on the application decision page
5. On first time submission without changing the loan term, a user gets loan term error

## Functional Bugs [APIs]
1. Incorrect response code when incorrect otp is used for otp verification

## Edge Cases Not Fully Handled
- Multiple tabs submitting simultaneously
- Very large loan amounts
- Network interruption during submission

## Requirement Gaps
- No OTP retry limit specified
- No timeout/retry policy documented
- On the api requirements docs, the loan term period must be one of: 3, 6, 12, 18, 24, 36 but the implementation is 15,30,45,60
