import {
  AppWindow,
  Boxes,
  Database,
  KeyRound,
  LayoutGrid,
  Package,
  RefreshCw,
  Server,
  KeySquareIcon,
  type LucideProps,
  DoorClosedIcon,
  FingerprintIcon,
} from "lucide-react";

/**
 * Pictogrammes génériques (lucide). Pour les logos officiels, remplacez le
 * contenu de chaque composant par le SVG de la marque (ex. simple-icons) :
 * le reste du code n'a pas à changer.
 */
export const NextIcon = (p: LucideProps) => <AppWindow {...p} />;
export const SpringIcon = (p: LucideProps) => <Server {...p} />;
export const PostgresIcon = (p: LucideProps) => <Database {...p} />;
export const JWTIcon = (p: LucideProps) => <KeySquareIcon {...p} />;
export const NextAuthIcon = (p: LucideProps) => <FingerprintIcon {...p} />;
export const SpringSessionIcon = (p: LucideProps) => <DoorClosedIcon {...p} />;
export const KeycloakIcon = (p: LucideProps) => <KeyRound {...p} />;
export const DockerIcon = (p: LucideProps) => <Package {...p} />;
export const TailwindIcon = (p: LucideProps) => <LayoutGrid {...p} />;
export const ReactQueryIcon = (p: LucideProps) => <RefreshCw {...p} />;
export const StackIcon = (p: LucideProps) => <Boxes {...p} />;
