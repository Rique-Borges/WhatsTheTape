import {
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { API_URL } from '@/config';
import { useAuth } from '@/context/AuthContext';

interface TracksApiContextProps {
  listTracks: () => Promise<any>;
  getTrack: (id: string) => Promise<any>;
  postTrack: (data: { content: string }) => Promise<any>;
}

const defaultContext: TracksApiContextProps = {
  listTracks: async () => [],
  getTrack: async () => null,
  postTrack: async () => null,
};

const TracksApiContext = createContext<TracksApiContextProps>(defaultContext);

const TracksApiContextProvider = ({ children }: PropsWithChildren) => {
  const { authToken, removeAuthToken } = useAuth();

  const handleUnauthorized = () => {
    removeAuthToken();
    throw new Error('Not authorized. Please sign in.');
  };

  const listTracks = async () => {
    if (!authToken) {
      throw new Error('Missing authentication token. Please sign in.');
    }

    const res = await fetch(`${API_URL}/track`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (res.status === 401) {
      handleUnauthorized();
    }

    if (!res.ok) {
      console.error(`Error fetching tracks [${res.status}]:`, await res.text());
      throw new Error('Error fetching tracks.');
    }

    return res.json();
  };

  const getTrack = async (id: string) => {
    if (!authToken) {
      throw new Error('Missing authentication token. Please sign in.');
    }

    const res = await fetch(`${API_URL}/track/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (res.status === 401) {
      handleUnauthorized();
    }

    if (!res.ok) {
      console.error(`Error fetching track [${res.status}]:`, await res.text());
      throw new Error('Error fetching track.');
    }

    return res.json();
  };

  const postTrack = async (data: { content: string }) => {
    if (!authToken) {
      throw new Error('Missing authentication token. Please sign in.');
    }

    const res = await fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      handleUnauthorized();
    }

    if (!res.ok) {
      console.error(`Error creating track [${res.status}]:`, await res.text());
      throw new Error('Error creating track.');
    }

    return res.json();
  };

  return (
    <TracksApiContext.Provider value={{ listTracks, getTrack, postTrack }}>
      {children}
    </TracksApiContext.Provider>
  );
};

export default TracksApiContextProvider;

export const useTracksApi = () => useContext(TracksApiContext);
