"use client";
import React, { useEffect, useState } from "react";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";
import "./habit-tab.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HabitTab() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repeatType, setRepeatType] = useState("daily");
  const [specificDays, setSpecificDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("http://localhost:4000/habits", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setHabits(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div className="habit-tab">
      <div className="habit-controls">
        <div className="filters">
          <div className="filter-item active">All</div>
          <div className="filter-item">Done</div>
          <div className="filter-item">Ongoing</div>
          <div className="filter-item">Archived</div>
        </div>
        <Modal>
          <ModalToggle>
            <div className="new-habit">New Habit</div>
          </ModalToggle>
          <ModalMenu>
            <div className="new-habit-menu">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  const formData = {
                    title: e.target.title.value,
                    slug: e.target.title.value
                      .toLowerCase()
                      .replace(/\s+/g, "-"),
                    repeat: repeatType,
                    count: Number(e.target.count.value),
                    target: Number(e.target.target.value),
                    habitType: e.target.habitType.value,
                    specificDays:
                      repeatType === "specific-days" ? specificDays : [],
                    customDate:
                      repeatType === "specific-date" ? selectedDate : null,
                  };

                  try {
                    const res = await fetch("http://localhost:4000/habits", {
                      method: "POST",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(formData),
                    });
                    if (!res.ok) throw new Error("Failed to create");
                    const newHabit = await res.json();
                    setHabits((prev) => [...prev, newHabit]);
                    e.target.reset();
                    alert("✅ Habit created successfully!");
                  } catch (err) {
                    console.error(err);
                    alert("❌ Failed to create habit");
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <div className="title">Create New Habit</div>
                <input type="text" name="title" placeholder="Title" required />
                <select
                  name="repeat"
                  required
                  onChange={(e) => setRepeatType(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="week-days">Week Days</option>
                  <option value="specific-days">Specific Days</option>
                  <option value="specific-date">Specific Date</option>
                </select>

                {repeatType === "specific-days" && (
                  <div className="specific-days-select">
                    <label>Select days of week:</label>
                    <div className="days-grid">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day, i) => (
                          <label
                            key={i}
                            style={{
                              display: "inline-flex",
                              gap: "4px",
                              marginRight: "8px",
                            }}
                          >
                            <input
                              type="checkbox"
                              value={i}
                              checked={specificDays.includes(i)}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setSpecificDays((prev) =>
                                  prev.includes(value)
                                    ? prev.filter((d) => d !== value)
                                    : [...prev, value]
                                );
                              }}
                            />
                            {day}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}
                {repeatType === "specific-date" && (
                  <div className="specific-date-select">
                    <label>Select a date:</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Choose a specific date"
                    />
                  </div>
                )}

                <input
                  type="number"
                  name="count"
                  placeholder="Count"
                  required
                />
                <input
                  type="number"
                  name="target"
                  placeholder="Target (days)"
                />
                <select name="habitType" defaultValue="simple">
                  <option value="simple">Simple</option>
                  <option value="multi">Multi</option>
                </select>
                <button disabled={isLoading}>
                  {isLoading ? (
                    <i className="bx bx-loader-alt bx-spin bx-xs"></i>
                  ) : (
                    "Create"
                  )}
                </button>
              </form>
            </div>
          </ModalMenu>
        </Modal>
      </div>
      <div className="habit-list">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div className="habit-item" key={habit._id}>
              <div className="title">{habit.title}</div>
              <div className="repeat">{habit.repeat}</div>
              <div className="count">{habit.count}</div>
              <Modal>
                <ModalToggle>
                  <div className="select-img">
                    <i className="bx bx-dots-horizontal-rounded bx-sm"></i>
                  </div>
                </ModalToggle>
                <ModalMenu>
                  <div className="update-habit">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        const formData = {
                          title: e.target.title.value,
                          repeat: e.target.repeat.value,
                          count: e.target.count.value,
                        };
                        try {
                          const res = await fetch(
                            `http://localhost:4000/habits/${habit._id}`,
                            {
                              method: "PUT",
                              credentials: "include",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(formData),
                            }
                          );
                          if (!res.ok) throw new Error("Failed to update");
                          const updated = await res.json();
                          setHabits((prev) =>
                            prev.map((h) => (h._id === habit._id ? updated : h))
                          );
                          alert("✅ Habit updated successfully!");
                        } catch (err) {
                          console.error(err);
                          alert("❌ Failed to update habit");
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      <div className="title">Edit Habit</div>
                      <input
                        type="text"
                        name="title"
                        defaultValue={habit.title}
                        placeholder="Title"
                      />
                      <select name="repeat" defaultValue={habit.repeat}>
                        <option value="daily">Daily</option>
                        <option value="week-days">Week Days</option>
                        <option value="specific-days">Specific Days</option>
                        <option value="specific-date">Specific Date</option>
                      </select>

                      <input
                        type="number"
                        name="count"
                        defaultValue={habit.count}
                        placeholder="Count"
                      />
                      <div className="buttons">
                        <button
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <i className="bx bx-loader-alt bx-spin bx-xs"></i>
                          ) : (
                            "Update"
                          )}
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={async () => {
                            const confirmDelete = window.confirm(
                              `Are you sure you want to delete "${habit.title}"?`
                            );
                            if (!confirmDelete) return;
                            setIsLoading(true);
                            try {
                              const res = await fetch(
                                `http://localhost:4000/habits/${habit._id}`,
                                {
                                  method: "DELETE",
                                  credentials: "include",
                                }
                              );
                              if (!res.ok) throw new Error("Failed to delete");
                              setHabits((prev) =>
                                prev.filter((h) => h._id !== habit._id)
                              );
                              alert("🗑️ Habit deleted successfully!");
                            } catch (err) {
                              console.error(err);
                              alert("❌ Failed to delete habit");
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                        >
                          {isLoading ? (
                            <i className="bx bx-loader-alt bx-spin bx-xs"></i>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </ModalMenu>
              </Modal>
            </div>
          ))
        ) : (
          <p>Habit is loading ...</p>
        )}
      </div>
    </div>
  );
}

export default HabitTab;
