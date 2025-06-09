import { useState } from "react";
import { Button } from "../ui/Button/Button";
import { SectionUsers } from "../ui/sections/SectionUsers/SectionUsers";
import { SectionRoles } from "../ui/sections/SectionRoles/SectionRoles";

export const Admin = () => {
  const [section, setSetcion] = useState<"users" | "roles">("users");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Button text="Users" onClickFn={() => setSetcion("users")} />
        <Button text="Roles" onClickFn={() => setSetcion("roles")} />
      </div>

      {section === "users" ? <SectionUsers /> : <SectionRoles />}
    </div>
  );
};
