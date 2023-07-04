//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
//import ierc20 from openzeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import ierc721 from openzeppelin
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error Stake__NotOwner();
error Stake__NotAbleToSubmitAssignment();
error Stake__NotAuthorizedByLecturer();
error Stake__SubmissionFailed();
error Stake__NotEligible();
error Stake__NotTimeToSubmit();
error Stake__NotTimeHasPassed();

contract SubmissionPlatform is ERC20 {
     address public lecturer;
     mapping(address => uint256) public studentBonus;
     mapping(address => bool) public eligibleStudents;
     address[] public examList;
     IERC20 public tokenContract;
     uint256 public timeToStartSubmiting;

     constructor(address _tokenContract) ERC20("CPE submission Token", "CPE") {
          lecturer = msg.sender;
          tokenContract = IERC20(_tokenContract);
          eligibleStudents[lecturer] = true;
          _mint(address(this), 400000 * 10 ** decimals());
          timeToStartSubmiting = block.timestamp + 1 days;
          examStatus = ExamStatus.NotSubmitted;
     }

     modifier OnlyOwner() {
          require(msg.sender == lecturer, "Stake__NotOwner");
          _;
     }

     enum ExamStatus {
          NotSubmitted,
          Submitted,
          Graded
     }

     ExamStatus public examStatus;

     struct StudentDetails {
          string name;
          string Matno;
          string email;
          uint256 points;
     }

     function lecturerSwitchMode() external OnlyOwner {
          if (examStatus == ExamStatus.NotSubmitted) {
               eligibleStudents[lecturer] = false;
               examStatus = ExamStatus.Submitted;
          } else if (examStatus == ExamStatus.Submitted) {
               examStatus = ExamStatus.Graded;
               eligibleStudents[lecturer] = false;
          } else if (examStatus == ExamStatus.Graded) {
               examStatus = ExamStatus.NotSubmitted;
               eligibleStudents[lecturer] = true;
          }
     }

     mapping(address => StudentDetails) public studentDetails;

     //@dev submit assignment
     //@param _name student name
     //@param _Matno student matriculation number
     //@param _email student email
     //@param _points student points
     //@title submit assignment
     //@notice submit assignment
     function subMitAssignment(
          string memory _name,
          string memory _Matno,
          string memory _email,
          uint256 _points
     ) external {
          require(
               eligibleStudents[lecturer] == true,
               "Stake__NotAbleToSubmitAssignment"
          );
          require(
               examStatus == ExamStatus.NotSubmitted,
               "Stake__NotAuthorizedByLecturer"
          );
          require(
               studentDetails[msg.sender].points == 0,
               "Stake__SubmissionFailed"
          );
          require(eligibleStudents[msg.sender] == false, "Stake__NotEligible");

          require(
               block.timestamp < timeToStartSubmiting,
               "Stake__NotTimeToSubmit"
          );

          if (block.timestamp >= timeToStartSubmiting) {
               revert("Stake__NotTimeHasPassed()");
          }

          if (studentDetails[msg.sender].points >= 1) {
               
               studentDetails[msg.sender].points += _points;
          } else {
               studentDetails[msg.sender].name = _name;
               studentDetails[msg.sender].Matno = _Matno;
               studentDetails[msg.sender].email = _email;
               studentDetails[msg.sender].points += _points;
          }

          uint256 tokenAmount = 1 * 10 ** decimals();
          tokenContract.transferFrom(msg.sender, address(this), tokenAmount);

          examStatus = ExamStatus.Submitted;
          studentBonus[msg.sender] = studentBonus[msg.sender] + tokenAmount;
          eligibleStudents[msg.sender] = true;
     }
}

//create  a fucntion for taht accept token
