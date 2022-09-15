import React from 'react'
import { Box, Flex, Image, Link, Spacer } from '@chakra-ui/react'
import Facebook from './assets/social-media-icons/facebook_32x32.png'
import Twitter from './assets/social-media-icons/twitter_32x32.png'
import Email from './assets/social-media-icons/email_32x32.png'
import { Button } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useState } from 'react'

const Navbar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])
  const [address, setAddress] = useState(null)
  const Chain = {chainId:'0x5'}
  
  // TODO: 連接錢包
  async function connectAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []) 
    switchOtherNetwork(Chain) //檢查網路是否需要切換
    setAccounts(accounts)  
    const signer = provider.getSigner()
    const myaddress = await signer.getAddress()   //取得連接的錢包地址
    setAddress(myaddress)
  }

  //斷開錢包
  const disconnectAccount = () => {
    alert("Disconnect wallet.")
    setAccounts(false)
    setAddress(null)
  }

  //取得錢包地址並顯示
  const sliceAddress = (address = '', width = 4) => {
    if (!address) {
      return ''
    }
    return `${address.slice(0, width + 1)}...${address.slice(-width)}`
  }

  //切換網路
  const switchOtherNetwork = async (Chain) => {
    const data = []
    data.push(Chain)
    console.log(Chain, "switchNetwork")
    await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: data
    })
  }

  return (
    <Flex
      className="navbar flex-row"
      justify="space-between" align="center"
      direction="row"
    >
      {/* Left Side - Social Media Icons */}

      <Flex justify="space-around" direction="row">
        <Link href="https://www.facebook.com" className="items">
          <Image src={Facebook} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.twitter.com" className="items">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.gamil.com" className="items">
          <Image src={Email} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      {/* Right Side - Section and Connect */}
      <Flex
        justify="space-around"
        align="center"
        className="flex-row"
        // width="40%"
        padding="30px"
      >
        <Box margin="0 15px" className="items">About</Box>
        <Spacer />
        <Box margin="0 15px" className="items">Mint</Box>
        <Spacer />
        <Box margin="0 15px" className="items">Team</Box>
        <Spacer />

        {/* Connect */}
        {isConnected ? (
          //<Box margin="0 15px">Connected</Box>
          <Button
            backgroundColor="black"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={disconnectAccount}
            colorScheme='black'
          >
          {sliceAddress(address)}
          </Button>
        ) : (
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
            colorScheme='yellow'
          >
            Connect
          </Button>
        )}
      </Flex>

    </Flex>
  )
}

export default Navbar