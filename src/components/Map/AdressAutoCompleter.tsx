import { useState, useEffect } from "react";

const fetchAddressSuggestions = async (
  query: string,
  country: string
) => {
  const viewboxes: Record<string, string> = {
    se: "11.027368,55.361737,24.177681,69.106247",
    dk: "8.072335,54.451666,12.690006,57.748417",
    no: "4.992078,57.809700,31.078166,71.188117",
    fi: "19.083209,59.454158,31.586707,70.092293",
    is: "-24.546524,63.295330,-13.495815,66.566330",
  };

  const viewbox = viewboxes[country.toLowerCase()];
  const url = `https://nominatim.openstreetmap.org/search?` +
    new URLSearchParams({
      q: query,
      countrycodes: country.toLowerCase(),
      format: "json",
      addressdetails: "1",
      limit: "10",
      viewbox,
      bounded: "1",
    });

  const res = await fetch(url, {
    headers: { "User-Agent": "yourappname/1.0" }
  });

  return res.json();
}

export function AddressAutocomplete({
  country,
  onSelect,
}: {
  country: string;
  onSelect: (coords: { lat: number; lng: number } | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    {
      place_id: number;
      display_name: string;
      lat: string;
      lon: string;
      [key: string]: any;
    }[]
  >([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const suggestions = await fetchAddressSuggestions(query, country);
      setResults(suggestions);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, country]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    onSelect(null);
    setSelectedAddress(null);
  };

  return (
    <div className="relative pt-2 mb-4">
      <label htmlFor="street">Street</label>
      <div className="flex items-center gap-2">
        <input
          className="input w-full"
          id="street"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter address..."
          required
        />
        {query && (
          <button
            onClick={handleClear}
            className="outline-btn"
          >
            CLEAR
          </button>
        )}
      </div>
      {results.length > 0 && !selectedAddress && (
        <ul className="absolute left-0 w-full top-full bg-white border rounded shadow z-10 flex-col items-start">
          {results.map((r) => (
            <li
              key={r.place_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect({ lat: parseFloat(r.lat), lng: parseFloat(r.lon) });
                setQuery(r.display_name);
                setResults([]);
                setSelectedAddress(r.display_name)
              }}
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
