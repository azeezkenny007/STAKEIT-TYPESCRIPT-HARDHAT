//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//import erc20.sol from openzeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./library/KennyMaths.sol";



contract BasicToken is ERC20 {
     constructor(string  memory _name,string memory _description ) ERC20(_name,_description) {
       _mint(msg.sender,10 **decimals());
     }

     event AddedValue(uint256 _firstValue,uint256 _secondValue);

     uint256 public c;

     enum State {
         OPEN,
         CLOSED
     }

     State private ContractState;

     struct ValueHeld {
         string name;
         uint256 amountSaved;
         uint256 TotalValueHeld;
     }

     mapping (address => ValueHeld) public PersonalDetail;

     ValueHeld[] private PeopleDetailArray;



     function addPersonalDetail(string memory _name,uint256 _amountSaved,uint256 _TotalValueHeld) external {
          ValueHeld memory individualPersonDetails = ValueHeld(_name,_amountSaved,_TotalValueHeld);
          PersonalDetail[msg.sender] = individualPersonDetails;
          PeopleDetailArray.push(individualPersonDetails);

     }

     function getPersonalDetails(address _owner) external view returns (ValueHeld memory) {
         require(_owner !=address(0),"This is an invalid address to work");
         return PersonalDetail[_owner];
     }

     function getIndexDetails(uint256 _index) external view returns (ValueHeld memory){
         require(_index < PeopleDetailArray.length ,"This sis an invalid address");
         return PeopleDetailArray[_index];
     }

     function add(uint256 _a,uint256 _b) external {
        c = KennyMath.addUp(_a,_b);
        emit AddedValue (_a,_b);
     }

     function sub(uint256  _a,uint256 _b) external {
         c = KennyMath.SubThem(_a,_b);
         emit AddedValue (_a,_b);
     }
}