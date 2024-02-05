import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, addresses } from "../constants/index";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const useEntranceFee = () => {
  const [entranceFee, setEntranceFee] = useState("0");

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const lotteryAddress =
    chainId in addresses ? addresses[chainId].addresses[0] : null;
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: lotteryAddress,
    functionName: "getEntranceFee",
  });

  useEffect(() => {
    if (!isWeb3Enabled) return;

    async function updateUI() {
      const fee = await getEntranceFee();
      setEntranceFee(ethers.formatUnits(fee._hex, "ether").toString());
    }

    updateUI()
      .then(() => console.log("Entrance fee set"))
      .catch(console.error);
  }, [isWeb3Enabled]);

  return entranceFee;
};

export default useEntranceFee;
