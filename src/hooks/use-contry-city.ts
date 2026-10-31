import { useCallback, useMemo, useState } from "react";
import countries from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";
import type { ComboOption } from "@/components/form/ComboboxCreatable";
import { useQuery } from "@tanstack/react-query";

countries.registerLocale(fr);

const DEFAULT_COUNTRY = "MA";

const COUNTRY_NAMES = countries.getNames("fr") as Record<string, string>;

const COUNTRY_OPTIONS: ComboOption[] = Object.entries(COUNTRY_NAMES)
  .map(([code, name]) => ({ value: code, label: name }))
  .sort((a, b) => a.label.localeCompare(b.label, "fr"));

// Tes villes actuelles, affichées en premier
const FEATURED_CITIES: Record<string, string[]> = {
  MA: [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fès",
    "Tanger",
    "Agadir",
    "Meknès",
    "Oujda",
    "Kénitra",
    "Tétouan",
    "Salé",
    "Nador",
    "Beni Mellal",
    "Errachidia",
    "Guelmim",
    "Laâyoune",
    "Ouezzane",
    "Safi",
    "Settat",
    "Taounate",
    "Tarfaya",
    "Taza",
    "Tiznit",
  ],
  FR: [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Montpellier",
    "Strasbourg",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Reims",
    "Le Havre",
    "Saint-Étienne",
    "Toulon",
    "Grenoble",
    "Dijon",
    "Angers",
    "Nîmes",
    "Villeurbanne",
  ],
  ES: [
    "Madrid",
    "Barcelone",
    "Valence",
    "Séville",
    "Saragosse",
    "Malaga",
    "Murcie",
    "Palma",
    "Las Palmas",
    "Bilbao",
    "Alicante",
    "Cordoue",
    "Valladolid",
    "Vigo",
    "Gijón",
    "L'Hospitalet",
  ],
};

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[\s_-]+/g, " ")
    .trim()
    .toUpperCase();

/** Accepte un code ISO ("ma"), un nom ("Maroc") ou l'ancien format ("MAROC"). "" si inconnu. */
export function resolveCountryCode(input: string): string {
  const v = input.trim();
  if (!v) return "";
  if (v.length === 2 && COUNTRY_NAMES[v.toUpperCase()]) return v.toUpperCase();
  const n = normalize(v);
  return COUNTRY_OPTIONS.find((o) => normalize(o.label) === n)?.value ?? "";
}

async function loadCities(code: string): Promise<string[]> {
  const { City } = await import("country-state-city");
  return [...new Set((City.getCitiesOfCountry(code) ?? []).map((c) => c.name))];
}

export const useCountryCity = (initialCountry = "", initialCity = "") => {
  const [countryCode, setCountryCode] = useState<string>(() =>
    initialCountry ? resolveCountryCode(initialCountry) : DEFAULT_COUNTRY,
  );
  const [city, setCity] = useState<string>(initialCity);

  const { data: extraCities = [], isFetching: loadingCities } = useQuery({
    queryKey: ["cities", countryCode],
    queryFn: () => loadCities(countryCode),
    enabled: !!countryCode,
    staleTime: Infinity, // la liste ne change jamais : cache pour la session
  });

  const cityOptions: ComboOption[] = useMemo(() => {
    const seen = new Set<string>();
    const out: ComboOption[] = [];
    for (const name of [
      ...(FEATURED_CITIES[countryCode] ?? []),
      ...extraCities,
    ]) {
      const k = normalize(name);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ value: name, label: name });
    }
    return out;
  }, [countryCode, extraCities]);

  const handleCountryChange = useCallback((value: string) => {
    setCountryCode(resolveCountryCode(value));
    setCity(""); // plus de ville par défaut : l'utilisateur choisit ou écrit
  }, []);

  const handleCityChange = useCallback(
    (value: string) => setCity(value.trim()),
    [],
  );

  /** Pays + ville d'un coup (géocodage inverse). `country` : code ISO ou nom. */
  const setLocation = useCallback((country: string, cityName: string) => {
    setCountryCode(resolveCountryCode(country));
    setCity(cityName.trim());
  }, []);

  const reset = useCallback(() => {
    setCountryCode(DEFAULT_COUNTRY);
    setCity("");
  }, []);

  return {
    selectedCountry: countryCode, // code ISO
    selectedCountryName: COUNTRY_NAMES[countryCode] ?? "", // à mettre dans le formulaire
    selectedCity: city,
    countryOptions: COUNTRY_OPTIONS,
    cityOptions,
    loadingCities,
    handleCountryChange,
    handleCityChange,
    setLocation,
    reset,
    isCountrySelected: !!countryCode,
    isCitySelected: !!city,
  };
};

export default useCountryCity;
