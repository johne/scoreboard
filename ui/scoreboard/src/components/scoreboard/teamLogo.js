import React from "react";

const TeamLogo = ({ teamInfo }) => {
  return (
    <div style={{ height: "474px", padding: "0px" }}>
      {teamInfo?.logo && (
        <img src={`http://ellis-scoreboard.local:3000/${teamInfo.logo}`} />
      )}
    </div>
  );
};

export default TeamLogo;
