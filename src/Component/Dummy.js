import React, { useState, useMemo } from "react";
import { Dropdown, Input, Typography, Divider } from "antd";
import { ClockCircleOutlined, SwapOutlined } from "@ant-design/icons";

const { Text } = Typography;

const FlightSearchDropdown = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");

  const recentSearches = [
    { from: "DEL", to: "HYD", date: "Sun, 19 Oct", details: "1 Traveller • Economy" },
    { from: "DEL", to: "HYD", date: "Sat, 18 Oct", details: "1 Traveller • Economy" },
  ];

  const popularAirports = [
    { code: "DEL", city: "New Delhi, Delhi, India", airport: "Indira Gandhi International Airport" },
    { code: "BOM", city: "Mumbai, Maharashtra, India", airport: "Chhatrapati Shivaji Maharaj International Airport" },
    { code: "HYD", city: "Hyderabad, Telangana, India", airport: "Rajiv Gandhi International Airport" },
    { code: "BLR", city: "Bengaluru, Karnataka, India", airport: "Kempegowda International Airport" },
    { code: "MAA", city: "Chennai, Tamil Nadu, India", airport: "Chennai International Airport" },
    { code: "CCU", city: "Kolkata, West Bengal, India", airport: "Netaji Subhas Chandra Bose International Airport" },
  ];

  // Filter helpers (search by code or city)
  const filteredAirportsFrom = useMemo(() => {
    const q = queryFrom.trim().toLowerCase();
    if (!q) return popularAirports;
    return popularAirports.filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.airport.toLowerCase().includes(q)
    );
  }, [queryFrom, popularAirports]);

  const filteredAirportsTo = useMemo(() => {
    const q = queryTo.trim().toLowerCase();
    if (!q) return popularAirports;
    return popularAirports.filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.airport.toLowerCase().includes(q)
    );
  }, [queryTo, popularAirports]);

  const makeDropdownContent = (isFrom = true) => {
    const recent = recentSearches;
    const filtered = isFrom ? filteredAirportsFrom : filteredAirportsTo;

    return (
      <div
        style={{
          padding: 12,
          width: 360,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <Text strong style={{ fontSize: 14 }}>
          Recent Searches
        </Text>

        {recent.map((item, i) => (
          <div
            key={i}
            onMouseDown={(e) => e.preventDefault()} // prevent input blur
            onClick={() => {
              if (isFrom) {
                setFrom(`${item.from} → ${item.to}`);
                setOpenFrom(false);
                setQueryFrom("");
              } else {
                setTo(`${item.from} → ${item.to}`);
                setOpenTo(false);
                setQueryTo("");
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #f0f0f0",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <ClockCircleOutlined style={{ fontSize: 18, color: "#555" }} />
            <div>
              <Text strong>{`${item.from} → ${item.to}`}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.date} • {item.details}
              </Text>
            </div>
          </div>
        ))}

        <Divider style={{ margin: "10px 0" }} />

        <Text strong style={{ fontSize: 14 }}>
          Popular Airports
        </Text>

        {filtered.map((airport, idx) => (
          <div
            key={idx}
            onMouseDown={(e) => e.preventDefault()} // prevents dropdown closing on click
            onClick={() => {
              const value = `${airport.code} - ${airport.city.split(",")[0]}`;
              if (isFrom) {
                setFrom(value);
                setOpenFrom(false);
                setQueryFrom("");
              } else {
                setTo(value);
                setOpenTo(false);
                setQueryTo("");
              }
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "10px 0",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 8,
                padding: "6px 8px",
                minWidth: 44,
                textAlign: "center",
                fontWeight: 700,
                color: "#333",
              }}
            >
              {airport.code}
            </div>

            <div>
              <Text strong style={{ display: "block" }}>
                {airport.city}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {airport.airport}
              </Text>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* FROM */}
      <Dropdown
        overlay={makeDropdownContent(true)}
        trigger={[]}
        visible={openFrom}
        onVisibleChange={(v) => setOpenFrom(v)}
      >
        <Input
          value={from}
          placeholder="From"
          onChange={(e) => {
            setFrom(e.target.value);
            setQueryFrom(e.target.value);
            setOpenFrom(true);
          }}
          onFocus={() => setOpenFrom(true)}
          onBlur={() => setTimeout(() => setOpenFrom(false), 150)} // small delay to allow clicks
          style={{
            width: 320,
            background: "#f2f4f7",
            borderRadius: 10,
            border: "1px solid transparent",
            padding: "10px 12px",
            fontWeight: 600,
          }}
        />
      </Dropdown>

      {/* Swap */}
      <div
        onClick={() => {
          setFrom((prev) => {
            setTo((t) => prev);
            return to;
          });
        }}
        style={{
          background: "#fff",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        <SwapOutlined style={{ transform: "rotate(90deg)", color: "#0056D2" }} />
      </div>

      {/* TO */}
      <Dropdown
        overlay={makeDropdownContent(false)}
        trigger={[]}
        visible={openTo}
        onVisibleChange={(v) => setOpenTo(v)}
      >
        <Input
          value={to}
          placeholder="To"
          onChange={(e) => {
            setTo(e.target.value);
            setQueryTo(e.target.value);
            setOpenTo(true);
          }}
          onFocus={() => setOpenTo(true)}
          onBlur={() => setTimeout(() => setOpenTo(false), 150)}
          style={{
            width: 320,
            background: "#f2f4f7",
            borderRadius: 10,
            border: "1px solid transparent",
            padding: "10px 12px",
            fontWeight: 600,
          }}
        />
      </Dropdown>
    </div>
  );
};

export default FlightSearchDropdown;


