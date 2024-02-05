import React from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, addresses } from "../constants/index";
import useEntranceFee from "../hooks/useEntranceFee";

const LotteryEntrance = () => {
  const { chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);

  const lotteryAddress =
    chainId in addresses ? addresses[chainId].addresses[0] : null;

  const entranceFee = useEntranceFee();

  const { runContractFunction: enterLottery } = useWeb3Contract({
    abi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
  });
  return <div>{entranceFee}</div>;
};

export default LotteryEntrance;
