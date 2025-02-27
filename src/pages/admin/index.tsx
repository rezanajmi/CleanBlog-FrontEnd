import { Card } from "@/components/Common/Card/Card";
import Link from "next/link";
import React from "react";

function AdminMainPage() {
  return (
    <>
      <h1>Adminstrator</h1>
      <hr></hr>
      <div className="grid grid-cols-2 text-xl">
        <Link href="/admin/category" className="block mb-2">
          <Card>Categories management</Card>
        </Link>
        <Link href="/admin/post" className="block mb-2">
          <Card>Posts management</Card>
        </Link>
      </div>
    </>
  );
}

export default AdminMainPage;
