# Test Plan – First-Time Loan Application

## Scope
- Authentication (phone + OTP)
- Loan application creation
- Validation rules
- Duplicate prevention
- Decision persistence

## Out of Scope

- Loan repayment
- Payment & disbursement flows (out of scope)
- Admin/back-office features
- SMS delivery (OTP is mocked)
- Performance and security testing (future scope)

## Test Types
- Automated API tests
- Automated UI tests
- Manual exploratory testing


## Test Data Strategy

- Valid & invalid phone numbers
- Boundary ages (17, 18, 19)
- Duplicate National IDs
- Minimum/maximum loan amounts
- Multiple loan term combinations
- Special characters & long text in “Purpose”

## Entry & Exit Criteria
### Entry Criteria
- Functional requirements approved
- APIs available
- Test environment stable
### Exit Criteria
- 100% critical test cases passed
- No open P0 / P1 defects
- RTM fully covered
- Automation suite passing

# Automation Testing Strategy
## Automation Scope
### UI Automation
- Error validation messages
- Authentication via Phone Number + OTP
- First-time loan application flow
- Form validations and error handling
- Loan decision display and persistence

### API Automation
- Decision retrieval
- Error scenarios
- Authentication endpoints
- Loan application submission
- Duplicate application prevention
- Validation and error responses
- Edge cases (invalid payloads, missing fields)

## Automation Coverage
- Happy paths
- Validation errors
- Edge conditions
- Regression scenarios

## Gaps With More Time
- Contract testing
- Load/performance testing
- Accessibility testing


