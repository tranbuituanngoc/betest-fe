import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import UserTable from '../../components/tables/user-table';
import { useSession } from 'next-auth/react';
import Header from '../../components/ui/header';

const HomePage = () => {
  const handleLogout = async () => {
    console.log("Logging out...");
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <UserTable />
      </main>
    </div>
  );
};

export default HomePage;
