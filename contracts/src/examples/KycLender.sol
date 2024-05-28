// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IKycAggregator} from "src/interfaces/IKycAggregator.sol";
import {KycDataConverter, CreditScore} from "src/libraries/KycDataConverter.sol";

contract KycLender {
    IKycAggregator oracle;
    uint256 goodCreditScore;

    constructor(address _oracle) {
        oracle = IKycAggregator(_oracle);
        goodCreditScore = KycDataConverter.getCreditNumber(CreditScore.GOOD);
    }

    modifier onlyKyc() {
        (, bool isAdult, , uint256 creditScore, , ) = oracle.getLatestKycData(
            msg.sender
        );
        require(isAdult && creditScore == goodCreditScore, "KYC:Unauthorized");
        _;
    }

    function borrow(uint256 amount) external onlyKyc {}
}
