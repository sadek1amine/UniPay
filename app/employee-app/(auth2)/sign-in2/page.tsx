'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginEmployee } from '@/lib/actions/employee.action';

const EmployeeLoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const positions = [
    { value: 'guichetier', label: 'Guichetier' },
    { value: 'responsable', label: 'Responsable d\'agence' },
    { value: 'admin', label: 'Administrateur' }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const position = formData.get('position') as 'guichetier' | 'responsable' | 'admin';

    try {
      const result = await loginEmployee({
        email,
        password,
        role: position,
      });

      switch (position) {
        case 'guichetier':
          router.push('/Teller-Dashboard');
          break;
        case 'responsable':
          router.push('/Branch-Manage-Dashboard');
          break;
        case 'admin':
          router.push('/Admin-Dashboard');
          break;
      }
    } catch {
      setError('Identifiants incorrects ou rôle invalide');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      
      

      {/* LOGIN CARD */}
      <div className="flex items-center justify-center flex-1 p-4">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/icons/UniPay-Logo_Black.png"
                width={150}
                height={120}
                alt="UniPay logo"
                priority
                className="mx-auto"
              />
            </Link>

            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Connexion Employé
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Poste
                  </label>
                  <select
                    name="position"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez votre poste</option>
                    {positions.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Connexion…' : 'Se connecter'}
                </button>

              </form>

              <div className="mt-8 text-center border-t pt-4">
                <Link
                  href="/"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Retour à l'accueil
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default EmployeeLoginPage;
