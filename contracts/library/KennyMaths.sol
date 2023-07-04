// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

library KennyMath {
     function  addUp(uint256 _a, uint256 _b) internal pure returns(uint256){
         return _a + _b;
     }

     function SubThem(uint256 _a, uint256 _b) internal pure returns(uint256){
         return _a - _b;
     }
}