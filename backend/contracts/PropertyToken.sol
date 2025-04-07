// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyToken is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("SmartDeed Property", "SDP") Ownable(msg.sender) {}

    function mintProperty(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenIdCounter++;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Only override from ERC721URIStorage (NOT ERC721 directly)
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
