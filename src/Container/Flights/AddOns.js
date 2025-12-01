// SeatSelectionPage.jsx
import React, { useState, useMemo } from "react";
import "./SeatSelection.css";

// Replace this path with the same local path you uploaded (already set)
const PLANE_SVG_BG = "/mnt/data/4a56b446-f168-4939-ba3f-06c5e213bb60.png";

const ROWS = ["A", "B", "C", "D", "E", "F"];
const COLS = [1,2,3,4,5,6,7]; // adjust to match screenshot

// Create initial seat map with some seats "booked" and some "premium"
function buildSeats() {
  const seats = [];
  for (let r = 0; r < ROWS.length; r++) {
    for (let c = 0; c < COLS.length; c++) {
      const id = `${ROWS[r]}${COLS[c]}`;
      // make some booked and some premium for demo
      const rand = Math.random();
      seats.push({
        id,
        row: ROWS[r],
        col: COLS[c],
        status: rand < 0.12 ? "booked" : "available", // ~12% booked
        type: rand > 0.85 ? "premium" : "standard", // ~15% premium
        price: rand > 0.85 ? 1900 : 350 + Math.round(Math.random() * 650),
      });
    }
  }
  return seats;
}

export default function SeatSelectionPage() {
  const [seats] = useState(buildSeats());
  const [selected, setSelected] = useState([]); // array of seat ids
  const [zoom, setZoom] = useState(1); // optional zoom
  const seatMap = useMemo(() => {
    // group by row for render convenience
    const map = {};
    ROWS.forEach(r => map[r] = []);
    seats.forEach(s => map[s.row].push(s));
    return map;
  }, [seats]);

  const toggleSelect = (seat) => {
    if (seat.status === "booked") return;
    setSelected(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(x => x !== seat.id);
      } else {
        return [...prev, seat.id];
      }
    });
  };

  // totals
  const total = useMemo(() => {
    const chosen = seats.filter(s => selected.includes(s.id));
    const sum = chosen.reduce((acc,s) => acc + (s.price||0), 0);
    return { count: chosen.length, sum, chosen };
  }, [selected, seats]);

  return (
    <div className="seat-page-root">
      <div className="seat-header">
        <div className="tabs">
          <button className="tab active">Seat</button>
          <button className="tab">Meal</button>
          <button className="tab">Insurance <span className="new-pill">New</span></button>
        </div>
        <div className="skip">Skip to Payment ›</div>
      </div>

      <div className="seat-content">
        <div className="legend-row">
          <div className="legend-item">
            <div className="legend-box legend-standard"></div>
            <div>₹350 - ₹1000</div>
          </div>
          <div className="legend-item">
            <div className="legend-box legend-premium"></div>
            <div>₹1900</div>
          </div>
        </div>

        <div className="seat-map-area">
          <div className="left-visual">
            {/* background plane art */}
            <img alt="plane" className="plane-bg" src={PLANE_SVG_BG} />
          </div>

          <div className="seat-grid-wrapper" style={{ transform: `scale(${zoom})` }}>
            <div className="front-label">FRONT</div>

            {/* column numbers */}
            <div className="col-numbers">
              <div className="filler" />
              {COLS.map(c => <div key={c} className="col-number">{c}</div>)}
            </div>

            {/* rows */}
            <div className="rows">
              {ROWS.map(row => (
                <div key={row} className="row">
                  <div className="row-label">{row}</div>
                  {seatMap[row].map(seat => {
                    const isSelected = selected.includes(seat.id);
                    const cls = [
                      "seat",
                      seat.status === "booked" ? "seat-booked" : "",
                      seat.type === "premium" ? "seat-premium" : "seat-standard",
                      isSelected ? "seat-selected" : ""
                    ].join(" ");

                    return (
                      <div key={seat.id} className={cls} onClick={() => toggleSelect(seat)}>
                        {/* visual seat */}
                        <div className="seat-top" />
                        <div className="seat-body" />
                        {seat.type === "premium" && <div className="xl-tag">XL</div>}
                        {seat.status === "booked" && <div className="lock">🔒</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>

          {/* arrow controls (left/right) */}
          <button className="nav-arrow left">‹</button>
          <button className="nav-arrow right">›</button>
        </div>
      </div>

      <aside className="sidebar">
        <div className="summary">
          <h3>Selected seats</h3>
          {total.count === 0 ? (
            <div className="no-selection">No seats selected</div>
          ) : (
            <>
              <ul className="selected-list">
                {total.chosen.map(s => (
                  <li key={s.id} className="selected-item">
                    <div className="dot" />
                    <div style={{flex:1}}>{s.id} — {s.row}{s.col}</div>
                    <div>₹{s.price}</div>
                  </li>
                ))}
              </ul>
              <div className="total-row">
                <div>Total</div>
                <div className="total-amount">₹{total.sum}</div>
              </div>
            </>
          )}

          <button className="continue-btn" disabled={total.count===0}>
            Continue to Payment
          </button>
        </div>
      </aside>
    </div>
  );
}
