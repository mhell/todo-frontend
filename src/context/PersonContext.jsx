import React, { createContext, useContext, useState, useEffect } from "react";
import { personService } from "../services/personService.js";
import { useAuth } from "./AuthContext.jsx";

const PersonContext = createContext(null);

export const PersonProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  useEffect(() => {
    getAll();
  }, []);

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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getById = (personId) => {
    return persons.find((person) => person.id === personId);
  };

  const create = async (person) => {
    try {
      setIsLoading(true);
      const createdPerson = await personService.create(person, token);
      setPersons((persons) => [...persons, createdPerson]);
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (person) => {
    try {
      setIsLoading(true);
      const updatedPerson = await personService.update(person, token);
      setPersons(persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (personId) => {
    try {
      setIsLoading(true);
      await personService.remove(personId, token);
      setPersons(persons.filter((person) => person.id !== personId));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError(error.message);
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
