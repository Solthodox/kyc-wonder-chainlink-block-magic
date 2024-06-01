// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {LinkTokenInterface} from "@chainlink/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink-ccip/src/v0.8/ccip/libraries/Client.sol";

contract BasicMessageSender  {
    enum PayFeesIn {
        Native,
        LINK
    }

    address immutable router;
    address immutable link;

    event MessageSent(bytes32 messageId);

    constructor(address _router, address _link) {
        router = _router;
        link = _link;
    }

    receive() external payable {}

    function _send(
        uint64 destinationChainSelector,
        address receiver,
        uint256 messageRaw,
        address account,
        PayFeesIn payFeesIn
    ) internal returns (bytes32 messageId) {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(messageRaw,account),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? link : address(0)
        });

        uint256 fee = IRouterClient(router).getFee(
            destinationChainSelector,
            message
        );

        if (payFeesIn == PayFeesIn.LINK) {
            LinkTokenInterface(link).approve(router, fee);
            messageId = IRouterClient(router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }

        emit MessageSent(messageId);
    }
}