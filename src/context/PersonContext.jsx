import React, { createContext, useContext, useState } from "react";
import { personService } from "../services/personService.js";
import { useAuth } from "./AuthContext.jsx";

const PersonContext = createContext(null);

export const PersonProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  const getAll = async () => {
    try {
      setIsLoading(true);
      const fetchedPersons = await personService.getAll(token);
      setPersons(fetchedPersons);
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const getById = (personId) => {
    return persons.find((p) => p.id === personId);
  };

  const create = async (person) => {
    try {
      setIsLoading(true);
      const createdPerson = await personService.create(person, token);
      setPersons([...persons, createdPerson]);
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (person) => {
    try {
      setIsLoading(true);
      await personService.update(person, token);
      setPersons(persons.map((p) => (p.id === person.id ? person : p)));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (personId) => {
    try {
      setIsLoading(true);
      await personService.remove(personId, token);
      setPersons(persons.filter((p) => p.id !== personId));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      if (error.status === 409) {
        setError({message: "Cannot delete user with assigned tasks", timestamp: Date.now()});
        return;
      }
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PersonContext.Provider value={{ persons, isLoading, error, getAll, getById, create, update, remove }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePersons = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("usePersons must be used within an PersonProvider");
  }
  return context;
};

export default PersonProvider;
