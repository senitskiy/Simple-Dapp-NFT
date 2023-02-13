// contracts/NFToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721/ERC721.sol';
import './ERC721/extensions/ERC721URIStorage.sol';
import './utils/Counters.sol';
import './utils/Ownable.sol';

contract NFToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address to, uint256 tokenId, string memory tokenURI) public onlyOwner {
        // адрес получателя, tokenId, tokenUri
        
        super._safeMint(to, tokenId);
        super._setTokenURI(tokenId, tokenURI);

    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}