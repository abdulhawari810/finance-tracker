const bankImages = import.meta.glob(`../assets/bank/*`, {
  eager: true,
  import: "default",
});

export function getImagesBank(name) {
  const path = `../assets/bank/${name}`;

  return bankImages[path];
}

const WalletImages = import.meta.glob(`../assets/e-wallet/*`, {
  eager: true,
  import: "default",
});

export function getImagesWallet(name) {
  const path = `../assets/e-wallet/${name}`;

  return WalletImages[path];
}

const ProfileImages = import.meta.glob(`../assets/profile/*`, {
  eager: true,
  import: "default",
});

export function getImagesProfile(name) {
  const path = `../assets/profile/${name}`;

  return ProfileImages[path];
}
