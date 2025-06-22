import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TennisGameComponent from './TennisGameComponent';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('TennisGameComponent', () => {
  it('affiche le titre et les boutons', () => {
    render(<TennisGameComponent />);
    expect(screen.getByText('Tennis Kata Testeur')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Envoyer')).toBeInTheDocument();
  });

  it('ajoute les lettres A et B à la séquence', () => {
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('B'));
    expect(screen.getByText('Séquence :')).toBeInTheDocument();
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('reset la séquence', () => {
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Séquence :')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('désactive le bouton Envoyer si la séquence est vide', () => {
    render(<TennisGameComponent />);
    expect(screen.getByText('Envoyer')).toBeDisabled();
  });

  it('active le bouton Envoyer si la séquence n\'est pas vide', () => {
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    expect(screen.getByText('Envoyer')).not.toBeDisabled();
  });

  it('affiche le loading lors de l\'envoi', async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // never resolves
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Envoyer'));
    expect(screen.getByText('Envoi...')).toBeInTheDocument();
  });

  it('affiche le r��sultat retourné par le backend', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [
        'Player A : 15 / Player B : 0',
        'Player A : 15 / Player B : 15',
        'Deuce'
      ]
    });
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('B'));
    fireEvent.click(screen.getByText('Envoyer'));
    await waitFor(() => {
      expect(screen.getByText('Résultat :')).toBeInTheDocument();
      expect(screen.getByText('Player A : 15 / Player B : 0')).toBeInTheDocument();
      expect(screen.getByText('Player A : 15 / Player B : 15')).toBeInTheDocument();
      expect(screen.getByText('Deuce')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si la requête échoue', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Envoyer'));
    await waitFor(() => {
      expect(screen.getByText('Erreur API')).toBeInTheDocument();
    });
  });
});
