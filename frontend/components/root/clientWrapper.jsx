"use client";
import AuthProvider from "@/components/root/authProvider.jsx";
import {  QueryClientProvider } from "@tanstack/react-query";
import  queryClient  from "@/lib/queryClient.js";
import TopBar from "@/components/root/topBar.jsx";
const ClientWrapper = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TopBar>{children}</TopBar>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default ClientWrapper;
