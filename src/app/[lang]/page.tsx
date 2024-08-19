'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useProductStore } from '@/stores/productStore';
import { useUserStore } from '@/stores/userStore';

export default function Home() {
  const t = useTranslations('Home');
  const { currentProduct, loading: productLoading, error: productError, fetchProductById } = useProductStore();
  const { currentUser, loading: userLoading, error: userError, fetchUserById } = useUserStore();

  useEffect(() => {
    fetchProductById(2);
    fetchUserById(2);
  }, [fetchProductById, fetchUserById]);

  if (productLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (productError || userError) {
    return <div>Error: {productError || userError}</div>;
  }

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      
      {currentProduct && (
        <div>
          <h2>Produit test:</h2>
          <p>Nom: {currentProduct.name}</p>
          <p>Prix: {currentProduct.price}</p>
        </div>
      )}

      {currentUser && (
        <div>
          <h2>Utilisateur test:</h2>
          <p>Nom: {currentUser.firstName} {currentUser.lastName}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
    </main>
  );
}