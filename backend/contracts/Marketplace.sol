// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {
    struct Listing {
        uint256 price;
        address seller;
    }

    IERC721 public propertyToken;
    mapping(uint256 => Listing) public listings;

    event TokenListed(uint256 indexed tokenId, uint256 price, address seller);
    event TokenSold(uint256 indexed tokenId, address buyer);
    event TokenDelisted(uint256 indexed tokenId);

    constructor(address _propertyToken) {
        propertyToken = IERC721(_propertyToken);
    }

    function listToken(uint256 tokenId, uint256 price) external {
        require(propertyToken.ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(propertyToken.getApproved(tokenId) == address(this), "Marketplace not approved");

        listings[tokenId] = Listing(price, msg.sender);
        emit TokenListed(tokenId, price, msg.sender);
    }

    function buyToken(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0), "Token not listed");
        require(msg.value == listing.price, "Incorrect payment");

        delete listings[tokenId];
        propertyToken.safeTransferFrom(listing.seller, msg.sender, tokenId);
        payable(listing.seller).transfer(msg.value);

        emit TokenSold(tokenId, msg.sender);
    }

    function delistToken(uint256 tokenId) external {
        require(listings[tokenId].seller == msg.sender, "Not your listing");
        delete listings[tokenId];

        emit TokenDelisted(tokenId);
    }

    function getListing(uint256 tokenId) external view returns (uint256 price, address seller) {
        Listing memory listing = listings[tokenId];
        return (listing.price, listing.seller);
    }
}