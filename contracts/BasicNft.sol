//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//import  erc721.sol from openzeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract BasicNft is ERC721{
      string public constant TOKEN_URI = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json"; 

      using Counters for Counters.Counter;

      Counters.Counter private _tokenIds;

      constructor(string memory _name,string memory _symbol) ERC721(_name , _symbol) {
      }
        
        
      
        function mintNft() external {
            _tokenIds.increment();
            uint256 tokenId = _tokenIds.current();
            _safeMint(msg.sender, tokenId);
        }

        function _baseURI() internal pure override returns (string memory) {
            return TOKEN_URI;
        }


}