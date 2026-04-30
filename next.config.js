/** @type {import('next').NextConfig} */
const nextConfig = {
  // En Next 14 le SWC minify est activé par défaut, on n’a plus besoin de le déclarer
  // swcMinify: true,               // ← SUPPRIMÉ (clé inconnue sous Next 16 et pas utile ici)

  // Vous n’avez pas besoin d’une configuration "images" spéciale pour les assets locaux.
  // Si vous avez besoin d’autoriser des images externes, ajoutez les URL dans `remotePatterns`.
  images: {
    // Exemple (décommenter si vous utilisez des images externes) :
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
