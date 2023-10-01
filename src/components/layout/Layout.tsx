
import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VisaEasy. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              This is a demo application for educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
