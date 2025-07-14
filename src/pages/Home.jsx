import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FcHome } from "react-icons/fc";
import { ImLocation2 } from "react-icons/im";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Home = () => {
  const [location, setLocation] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (pos) => {
        const {
          latitude,
          longitude,
          accuracy,
          speed,
          altitudeAccuracy,
          altitude,
        } = pos.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          speed,
          altitudeAccuracy,
          altitude,
        });
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setLocation(null);
      },
      { enableHighAccuracy: true }
    );
    //similarlly we have navigator.currentPostion which will update the location in real time

  }, []);

  // Network Info
  useEffect(() => {
    const connection = navigator.connection || navigator.webkitConnection;
   // console.log("Connection object:", connection);
    //downlink or speed
    // effectiveType
    // rtt  round trip time
    // saveData boolean if data ssave is ono it is true else false

    if (connection) {
      const updateNetwork = () => {
        setNetwork({
          type: connection.effectiveType,
          downlink: connection.downlink,
        });
      };
      updateNetwork();
      
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[var(--bg-body)] text-[var(--text)] px-6 py-8 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex gap-4 items-center">
      <FcHome/> Home
      </h1>

      <div className="mb-8 p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-[var(--shadow)]">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)] flex items-center gap-2">
          <ImLocation2 className="text-[var(--success)]"/>Your Location
        </h2>
        {location ? (
          <>
            <p className="text-[var(--text-light)] mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(location).map(([key, value]) => (
                <span key={key} >
                  <span className="md:text-xl font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>: <span className="font-semibold opacity-90">{value ?? "N/A"}</span>
                  {key === "accuracy" || key === "altitudeAccuracy"
                    ? " meters"
                    : " "}
                  {key === "speed" ? " m/s" : ""}
                  <br />
                </span>
              ))}
            </p>
            <div className="h-[250px] w-full rounded-md overflow-hidden border border-[var(--border)]">
              <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.latitude, location.longitude]}>
                  <Popup>You are here</Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        ) : (
          <p className="text-[var(--text-light)]">Fetching location...</p>
        )}
      </div>

      {/* Network Info Section */}
      <div className="mb-8 p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-[var(--shadow)]">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">
          📶 Network Info
        </h2>
        {network ? (
          <p className="text-[var(--text-light)]">
            Type: {network.type.toUpperCase()}, Speed: {network.downlink} Mbps
          </p>
        ) : (
          <p className="text-[var(--text-light)]">
            Network info not supported on this browser.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
