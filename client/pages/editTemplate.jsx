import React, { useEffect, useState } from "react";
import { checkAdminPrivilege } from "../utils/apiWrapper";
import { Head, TemplateDraft } from "../components";
import { Container } from "reactstrap";

export default function EditTemplate() {
  const [isAdmin, setIsAdmin] = useState(false);
  const id = "5ea1abb6e25652db3a336d26";

  const successStatus = 200;

  useEffect(() => {
    const checkPriv = async () => {
      const raw_priv = await checkAdminPrivilege(id);
      const isAdmin = await raw_priv.json();
      if (isAdmin.status === successStatus) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkPriv();
  }, []);
  return (
    <Container>
      <Head />
      {isAdmin && (
        <div>ONLY IF YOU ARE ADMIN SHOULD YOU BE ABLE TO READ THIS</div>
      )}
      <TemplateDraft id={id}></TemplateDraft>
    </Container>
  );
}
